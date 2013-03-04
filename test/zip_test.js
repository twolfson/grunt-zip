var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var fs = require('fs'),
    _ = require('underscore.string');
exports['zip'] = {
  setUp: function (done) {
    // setup here
    done();
  },
  'singleZip': function (test) {
    test.expect(1);

    // Read in the content
    var expectedContent = fs.readFileSync('expected/single_zip/file.zip', 'binary'),
        actualContent = fs.readFileSync('actual/single_zip/file.zip', 'binary');

    // Calculate the difference in bits (accounts for random bits)
    var difference = _.levenshtein(expectedContent, actualContent);

    // Assert that we are under our threshold
    var underThreshold = difference <= 15;
    test.ok(underThreshold, 'Bitwise difference of zip files "' + difference + '" should be under 10.');

    // Complete the test
    test.done();
  },
  'multiZip': function (test) {
    test.expect(1);
    // tests here
    var expectedContent = fs.readFileSync('expected/multi_zip/file.zip', 'binary'),
        actualContent = fs.readFileSync('actual/multi_zip/file.zip', 'binary'),
        difference = _.levenshtein(expectedContent, actualContent),
        underThreshold = difference <= 30;
    test.ok(underThreshold, 'Bitwise difference of zip files "' + difference + '" should be under 20.');
    test.done();
  },
  'singleUnzip': function (test) {
    test.expect(2);

    // tests here
    var expectedContent = grunt.file.read('expected/single_unzip/a.js'),
        actualContent = grunt.file.read('actual/single_unzip/a.js');
    test.equal(actualContent, expectedContent, 'should return the correct value for a.js.');

    expectedContent = grunt.file.read('expected/single_unzip/b.js');
    actualContent = grunt.file.read('actual/single_unzip/b.js');
    test.equal(actualContent, expectedContent, 'should return the correct value for b.js.');

    test.done();
  },
  'nestedUnzip': function (test) {
    test.expect(8);

    // Using an anti-pattern for this one
    var files = [
          'css/bootstrap-responsive.css',
          'css/bootstrap-responsive.min.css',
          'css/bootstrap.css',
          'css/bootstrap.min.css',
          'img/glyphicons-halflings-white.png',
          'img/glyphicons-halflings.png',
          'js/bootstrap.js',
          'js/bootstrap.min.js'
        ];
    files.forEach(function (file) {
      var expectedContent = grunt.file.read('expected/nested_unzip/bootstrap/' + file),
          actualContent = grunt.file.read('actual/nested_unzip/bootstrap/' + file);
      test.equal(actualContent, expectedContent, 'should return the correct value for ' + file);
    });

    test.done();
  }
};
