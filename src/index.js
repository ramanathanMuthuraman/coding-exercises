const fs = require('fs');

const writeFile = function (filename, data) {
  fs.writeFileSync(filename, data);
};

const getFileContent = function (filename) {
  return fs.readFileSync(filename).toString();
};

const processContent = function (data, find, replace) {
  const regExpObject = new RegExp(find, 'g');
  const count = (data.match(regExpObject) || []).length;
  const replacedText = data.replace(regExpObject, replace);
  return {data: replacedText, matchesCount: count}
};

const getStats = function (matchesCount, find, replace) {
  return `${matchesCount} occurence(s) of ${find} where replaced with ${replace}`;
};


const init = function (params) {
  const content = getFileContent(params.inputFilePath);
  const result = processContent(content, params.findString, params.replaceString);
  writeFile(params.outputFilePath, result.data);
  console.log(getStats(result.matchesCount, params.findString, params.replaceString));
};

module.exports = {
  getFileContent: getFileContent,
  processContent: processContent,
  writeFile: writeFile,
  getStats: getStats,
  init: init
};