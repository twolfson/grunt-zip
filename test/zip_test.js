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
