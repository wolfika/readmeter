var assert = require('chai').assert;
var readmeter = require('../src/readmeter.js');

function generateString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function randomLength() {
  return Math.ceil(Math.random() * 8);
}

function generateWords(count) {
  var words = '';

  for (var i = 0; i < count; i++) {
    words += ' ' + generateString(randomLength());
  }

  return words.substr(1);
}

describe('readmeter()', function() {
  describe('default settings', function() {
    it('should handle empty strings', function() {
      var text = '';
      var response = readmeter(text);

      assert.equal(response, 0);
    });

    it('should handle less than 1 minute strings', function() {
      var text = generateWords(199);
      var response = readmeter(text);

      assert.equal(response, 59);
    });

    it('should handle 1 minute strings', function() {
      var text = generateWords(200);
      var response = readmeter(text);

      assert.equal(response, 60);
    });

    it('should handle more than 1 minute strings', function() {
      var text = generateWords(205);
      var response = readmeter(text);

      assert.equal(response, 61);
    });

    it('should handle long strings', function() {
      var text = generateWords(3900);
      var response = readmeter(text);

      assert.equal(response, 1170);
    });
  });
});
