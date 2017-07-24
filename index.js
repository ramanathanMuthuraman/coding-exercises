const fs = require('fs');
let inputFileName = '';
let outputFileName = '';
let findString = '';
let replaceString = '';

[inputFileName, findString, replaceString, outputFileName] = process.argv.slice(2)

const writeFile = (filename, data, count, find, replace) => {
    fs.writeFile(filename, data, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(`${count} occurence(s) of ${find} where replaced with ${replace}`);
    });
};

const readFile = (filename) => {
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        writeReplacedFile(data, findString, replaceString);
    });
};

const writeReplacedFile = (data, find, replace) => {
    const regExpObject = new RegExp(find, 'g');
    const count = (data.match(regExpObject) || []).length;
    const replacedText = data.replace(regExpObject, replace);
    writeFile(outputFileName, replacedText, count, find, replace);
};

readFile(inputFileName);
