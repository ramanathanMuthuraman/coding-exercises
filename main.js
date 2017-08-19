const argv = require('optimist')
  .usage('Usage: $0 -i [input file path] -f [string to find] -r [string to replace] -o [output file path]')
  .demand(['i', 'f', 'r', 'o'])
  .argv;

const app = require('./src');

app.init({
  inputFilePath: argv.i,
  findString: argv.f,
  replaceString: argv.r,
  outputFilePath: argv.o
});