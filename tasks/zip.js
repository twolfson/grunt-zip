/*
 * grunt-zip
 * https://github.com/twolfson/grunt-zip
 *
 * Copyright (c) 2013 Todd Wolfson
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    path = require('path'),
    Zip = require('jszip'),
    gruntRetro = require('grunt-retro');
module.exports = function(grunt) {
  // Load and bind grunt-retro
  grunt = gruntRetro(grunt);

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  // Localize underscore
  var _ = grunt.utils._;

  grunt.registerMultiTask('zip', 'Zip files together', async function() {
    // Localize variables
    var done = this.async(),
        file = this.file,
        data = this.data,
        src = file.src,
        dest = file.dest,
        router = data.router;

    // Fallback options (e.g. base64, compression)
    _.defaults(data, {
      base64: false
    });

    // Collect our file paths
    var globOptions = {dot: data.dot},
        srcFolders = grunt.file.expandDirs(globOptions, src),
        srcFiles = grunt.file.expandFiles(globOptions, src);

    // If there is no router
    if (!router) {
      // Grab the cwd and return the relative path as our router
      var cwd = data.cwd || process.cwd(),
          separator = new RegExp(path.sep.replace('\\', '\\\\'), 'g');
      router = function routerFn (filepath) {
        // Join path via /
        // DEV: Files zipped on Windows need to use /  to have the same layout on Linux
        return path.relative(cwd, filepath).replace(separator, '/');
      };
    } else if (data.cwd) {
    // Otherwise, if a `cwd` was specified, throw a fit and leave
      grunt.fail.warn('grunt-zip does not accept `cwd` and `router` in the same config due to potential ordering complications. Please choose one.');
    }

    // Generate our zipper
    var zip = new Zip();

    // For each of the srcFolders
    srcFolders.forEach(function (folderpath) {
      // Route the folder
      var routedPath = router(folderpath);

      // If there is a folder, add it to the zip (allows for skipping)
      if (routedPath) {
        grunt.verbose.writeln('Adding folder: "' + folderpath + '" -> "' + routedPath + '"');
        zip.folder(routedPath);
      }
    });

    // For each of the srcFiles
    srcFiles.forEach(function (filepath) {
      // Read in the content and add it to the zip
      var input = fs.readFileSync(filepath),
          routedPath = router(filepath);

      // If it has a path, add it (allows for skipping)
      if (routedPath) {
        grunt.verbose.writeln('Adding file: "' + filepath + '" -> "' + routedPath + '"');
        zip.file(routedPath, input);
      }
    });

    // Create the destination directory
    var destDir = path.dirname(dest);
    grunt.file.mkdir(destDir);

    // Write out the content
    var output = await zip.generateAsync({type: 'nodebuffer', compression: data.compression});
    fs.writeFileSync(dest, output);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + dest + '" created.');
    done();
  });

  function echo(a) {
    return a;
  }
  grunt.registerMultiTask('unzip', 'Unzip files into a folder', async function() {
    // Collect the filepaths we need
    var done = this.async(),
        file = this.file,
        data = this.data,
        src = file.src,
        srcFiles = grunt.file.expand(src),
        dest = file.dest,
        router = data.router || echo;

    // Fallback options (e.g. checkCRC32)
    _.defaults(data, {
      base64: false,
      checkCRC32: true
    });

    // Iterate over the srcFiles
    var filesWritten = false;
    for (var filepath of srcFiles) {
      // Read in the contents
      var input = fs.readFileSync(filepath);

      // Unzip it
      var zip = await Zip.loadAsync(input);

      // Pluck out the files
      var files = zip.files,
          filenames = Object.getOwnPropertyNames(files);

      // Iterate over the files
      for (var filename of filenames) {
        // Find the content
        var fileObj = files[filename],
            content = await fileObj.async("nodebuffer"),
            routedName = router(filename);

        // If there is a file path (allows for skipping)
        if (routedName) {
          // Determine the filepath
          var filepath = path.join(dest, routedName);
          filesWritten = true;

          // If the routedName ends in a `/`, treat it as a/an (empty) directory
          // DEV: We use `/` over path.sep since it is consistently `/` across all platforms
          if (routedName.slice(-1) === '/') {
            grunt.verbose.writeln('Creating directory: "' + filepath + '"');
            grunt.file.mkdir(filepath);
          } else {
            // Create the destination directory
            var fileDir = path.dirname(filepath);

            // Write out the content
            grunt.file.mkdir(fileDir);
            if ((fileObj.unixPermissions & 0xf000) === 0xa000) {
              var target = content.toString('utf8');
              grunt.verbose.writeln('Creating symbolic link from: "' + filepath + '" to "' + target + '"');
              // fs.symlinkSync throws EEXIST if a file with the same name as the link already exists
              try {
                fs.unlinkSync(filepath);
              }
              catch (err) {
                if (err.code !== 'ENOENT') {
                  throw err;
                }
              }
              fs.symlinkSync(target, filepath);
            } else {
              grunt.verbose.writeln('Writing file: "' + filepath + '"');
              fs.writeFileSync(filepath, content, {mode: fileObj.unixPermissions});
            }
          }
        }
      }
    }

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    if (filesWritten) {
      grunt.log.writeln('Created "' + this.file.dest + '" directory');
    } else {
      grunt.log.writeln('No files were found in source. "' + this.file.dest + '" has not been created.');
    }
    done();
  });

};
