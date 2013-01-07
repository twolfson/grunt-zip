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
    var underThreshold = difference <= 10;
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
        underThreshold = difference <= 20;
    test.ok(underThreshold, 'Bitwise difference of zip files "' + difference + '" should be under 20.');
    test.done();
  // },
  // 'unzip': function (test) {
  //   test.expect(1);
  //   // tests here
  //   var expectedContent = grunt.file.read('expected/file.js'),
  //       actualContent = grunt.file.read('actual/file.js');
  //   test.equal(actualContent, expectedContent, 'should return the correct value.');
  //   test.done();
  }
};
