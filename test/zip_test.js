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

function addMethods(test) {
  // Assert two files are equal
  test.equalFiles = function (filename) {
    var expectedContent = fs.readFileSync('expected/' + filename, 'binary'),
        actualContent = fs.readFileSync('actual/' + filename, 'binary');
    test.strictEqual(actualContent, expectedContent, filename + 'does not have the same content in `expected` as `actual`');
  };

  // Assert two files are close enough
  // ANTI-PATTERN: 3 specifically ordered/non-modular parameters =(
  test.closeFiles = function (filename, distance) {

  };
}

var fs = require('fs'),
    _ = require('underscore.string');
exports['zip'] = {
  setUp: function (done) {
    // setup here
    done();
  },
  // 'singleZip': function (test) {
  //   test.expect(1);

  //   // Read in the content
  //   var expectedContent = fs.readFileSync('expected/single_zip/file.zip', 'binary'),
  //       actualContent = fs.readFileSync('actual/single_zip/file.zip', 'binary');

  //   // Calculate the difference in bits (accounts for random bits)
  //   var difference = _.levenshtein(expectedContent, actualContent);

  //   // Assert that we are under our threshold
  //   var underThreshold = difference <= 15;
  //   test.ok(underThreshold, 'Bitwise difference of zip files "' + difference + '" should be under 10.');

  //   // Complete the test
  //   test.done();
  // },
  // 'multiZip': function (test) {
  //   test.expect(1);
  //   // tests here
  //   var expectedContent = fs.readFileSync('expected/multi_zip/file.zip', 'binary'),
  //       actualContent = fs.readFileSync('actual/multi_zip/file.zip', 'binary'),
  //       difference = _.levenshtein(expectedContent, actualContent),
  //       underThreshold = difference <= 30;
  //   test.ok(underThreshold, 'Bitwise difference of zip files "' + difference + '" should be under 20.');
  //   test.done();
  // },
  'singleUnzip': function (test) {
    // Add in test methods
    test.expect(2);
    addMethods(test);

    // Compare a and b
    test.equalFiles('single_unzip/a.js');
    test.equalFiles('single_unzip/b.js');

    // Return
    test.done();
  },
  'nestedUnzip': function (test) {
    test.expect(8);
    addMethods(test);

    // Compare all nested unzip files
    test.equalFiles('nested_unzip/bootstrap/css/bootstrap-responsive.css');
    test.equalFiles('nested_unzip/bootstrap/css/bootstrap-responsive.min.css');
    test.equalFiles('nested_unzip/bootstrap/css/bootstrap.css');
    test.equalFiles('nested_unzip/bootstrap/css/bootstrap.min.css');
    test.equalFiles('nested_unzip/bootstrap/img/glyphicons-halflings-white.png');
    test.equalFiles('nested_unzip/bootstrap/img/glyphicons-halflings.png');
    test.equalFiles('nested_unzip/bootstrap/js/bootstrap.js');
    test.equalFiles('nested_unzip/bootstrap/js/bootstrap.min.js');

    test.done();
  },
  'image': function (test) {
    test.expect(1);
    addMethods(test);
    test.equalFiles('image_zip/unzip/test_files/smile.gif');
    test.done();
  }
};
