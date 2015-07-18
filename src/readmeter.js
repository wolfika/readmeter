var countWords = function countWords(str) {
  var words = str
    .replace(/[.,?!;()"'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .split(' ');

  return words.length;
};

module.exports = exports = function readmeter(input) {
  var wordCount = countWords(input);
  var seconds = Math.floor(wordCount / 200 * 60);

  return seconds;
};
