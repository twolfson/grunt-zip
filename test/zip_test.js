// Load in dependencies
var expect = require('chai').expect;
var fsUtils = require('./utils/fs');
var gruntUtils = require('./utils/grunt');

// Begin our tests
describe('A grunt `zip` task', function () {
  describe('zipping a single file', function () {
    gruntUtils.runTask('zip:single');

    it('matches the expected output', function () {
      fsUtils.assertCloseFiles('single_zip/file.zip', 50);
    });
  });

  describe('zipping multiple file', function () {
    gruntUtils.runTask('zip:multi');

    it('matches the expected output', function () {
      fsUtils.assertCloseFiles('multi_zip/file.zip', 50);
    });
  });

  describe('zipping a binary file (image)', function () {
    gruntUtils.runTask('zip:image');
    gruntUtils.runTask('unzip:test-zip-image');

    it('does not corrupt the file', function () {
      fsUtils.assertEqualFiles('image_zip/unzip/test_files/smile.gif');
    });
  });

  describe('zipping nested folders', function () {
    gruntUtils.runTask('zip:nested');
    gruntUtils.runTask('unzip:test-zip-nested');

    it('saves the nested files', function () {
      fsUtils.assertEqualFiles('nested_zip/unzip/test_files/nested/hello.js');
      fsUtils.assertEqualFiles('nested_zip/unzip/test_files/nested/world.txt');
      fsUtils.assertEqualFiles('nested_zip/unzip/test_files/nested/glyphicons-halflings.png');
      fsUtils.assertEqualFiles('nested_zip/unzip/test_files/nested/nested2/hello10.txt');
      fsUtils.assertEqualFiles('nested_zip/unzip/test_files/nested/nested2/hello20.js');
    });
  });

  describe('zipping files with a `router`', function () {
    gruntUtils.runTask('zip:router');
    gruntUtils.runTask('unzip:test-zip-router');

    it('routes the files', function () {
      fsUtils.assertEqualFiles('router_zip/unzip/hello.js');
      fsUtils.assertEqualFiles('router_zip/unzip/hello10.txt');
    });
  });
});

exports.wat = {
  'routerUnzip': function (test) {
    test.expect(8);
    addMethods(test);

    // unzip:router

    // Compare all router unzip files
    fsUtils.assertEqualFiles('router_unzip/bootstrap-responsive.css');
    fsUtils.assertEqualFiles('router_unzip/bootstrap-responsive.min.css');
    fsUtils.assertEqualFiles('router_unzip/bootstrap.css');
    fsUtils.assertEqualFiles('router_unzip/bootstrap.min.css');
    fsUtils.assertEqualFiles('router_unzip/glyphicons-halflings-white.png');
    fsUtils.assertEqualFiles('router_unzip/glyphicons-halflings.png');
    fsUtils.assertEqualFiles('router_unzip/bootstrap.js');
    fsUtils.assertEqualFiles('router_unzip/bootstrap.min.js');

    test.done();
  },
  'cwdZip': function (test) {
    // Set up
    test.expect(2);
    addMethods(test);

    // zip:cwd
    // unzip:test-zip-cwd

    // Assert all files are the same as they went in
    fsUtils.assertEqualFiles('cwd_zip/unzip/hello.js');
    fsUtils.assertEqualFiles('cwd_zip/unzip/nested2/hello10.txt');

    // Return
    test.done();
  },
  'dotZip': function (test) {
    // Set up
    test.expect(2);
    addMethods(test);

    // zip:dot
    // unzip:test-zip-dot

    // Assert all files are the same as they went in
    fsUtils.assertEqualFiles('dot_zip/unzip/test_files/dot/.test/hello.js');
    fsUtils.assertEqualFiles('dot_zip/unzip/test_files/dot/test/.examplerc');

    // Return
    test.done();
  },
  'skipFilesZip': function (test) {
    // Set up
    test.expect(2);
    addMethods(test);

    // zip:skip-files
    // unzip:test-zip-skip-files

    // Assert all files are the same as they went in
    fsUtils.assertEqualFiles('skip_files_zip/unzip/test_files/nested/hello.js');
    fsUtils.assertNoFile('skip_files_zip/unzip/test_files/nested/nested2/hello10.txt');

    // Return
    test.done();
  },
  'skipFilesUnzip': function (test) {
    test.expect(8);
    addMethods(test);

    // unzip:skip-files

    // Assert CSS files do not exist
    fsUtils.assertNoFile('skip_files_unzip/bootstrap/css/bootstrap-responsive.css');
    fsUtils.assertNoFile('skip_files_unzip/bootstrap/css/bootstrap-responsive.min.css');
    fsUtils.assertNoFile('skip_files_unzip/bootstrap/css/bootstrap.css');
    fsUtils.assertNoFile('skip_files_unzip/bootstrap/css/bootstrap.min.css');

    // Assert other files do exist
    fsUtils.assertEqualFiles('skip_files_unzip/bootstrap/img/glyphicons-halflings-white.png');
    fsUtils.assertEqualFiles('skip_files_unzip/bootstrap/img/glyphicons-halflings.png');
    fsUtils.assertEqualFiles('skip_files_unzip/bootstrap/js/bootstrap.js');
    fsUtils.assertEqualFiles('skip_files_unzip/bootstrap/js/bootstrap.min.js');

    test.done();
  },
  'emptyUnzip': function (test) {
    // unzip:empty

    var stats = fs.statSync('actual/empty/double_empty');
    test.strictEqual(stats.isDirectory(), true);
    test.done();
  }
};

// TODO: Figure out how to test this only for grunt@0.4
var fs = require('fs');
// 0.4 specific test for twolfson/grunt-zip#6
exports['0.4'] = {
  'dest-template': function (test) {
    test.expect(2);

    // 'zip:actual/template_zip/<%= pkg.name %>.zip'

    // Grab the stats on the file
    var file = __dirname + '/actual/template_zip/grunt-zip.zip';
    fs.stat(file, function (err, stat) {
      // Assert there is no error
      test.equal(err, null, 'There was no error during `stat`');

      // and we are looking at a file
      test.ok(stat.isFile, 'The templated zip file was not successfully created');

      // Callback
      test.done();
    });
  }
};
