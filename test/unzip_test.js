// Load in dependencies
var expect = require('chai').expect;
var fsUtils = require('./utils/fs');
var gruntUtils = require('./utils/grunt');

// Begin our tests
describe('A grunt `unzip` task', function () {
  describe('unzipping a file', function () {
    gruntUtils.runTask('unzip:single');

    it('generates a matching first file', function () {
      fsUtils.assertEqualFiles('single_unzip/a.js');
    });

    it('generates a matching second file', function () {
      fsUtils.assertEqualFiles('single_unzip/b.js');
    });
  });

  describe('unzipping a file with nested folders', function () {
    gruntUtils.runTask('unzip:nested');

    it('extracts all expected files', function () {
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/css/bootstrap-responsive.css');
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/css/bootstrap-responsive.min.css');
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/css/bootstrap.css');
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/css/bootstrap.min.css');
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/img/glyphicons-halflings-white.png');
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/img/glyphicons-halflings.png');
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/js/bootstrap.js');
      fsUtils.assertEqualFiles('nested_unzip/bootstrap/js/bootstrap.min.js');
    });
  });
});

// TODO: Remove me
exports.world = {
};
