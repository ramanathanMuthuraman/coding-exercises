const fs = require('fs');
const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const fileName = "test.txt";
const data = "Lorem Ipsum Lorem Ipsum";
const find = "Ipsum";
const replace = "Lorem";

const readFileSyncMock = sinon.stub().returns(data);
const writeFileSyncMock = sinon.stub();

const fsMock = {
  readFileSync: readFileSyncMock,
  writeFileSync: writeFileSyncMock
};

const index = require('../src/index');

index.__Rewire__({
  fs: fsMock
});


describe('index', function () {
  it('getFileContent', function () {
    expect(index.getFileContent(fileName)).to.equal(data);
  });

  it('processContent', function () {
    const expectedResult = {data: "Lorem Lorem Lorem Lorem", matchesCount: 2};
    expect(index.processContent(data, find, replace)).to.deep.equal(expectedResult);
  });

  it('writeFile', function () {
    index.writeFile(fileName, data);
    expect(writeFileSyncMock).to.have.been.calledWith(fileName, data);
  });

  it('getStats', function () {
    const matchesCount = 2;
    const expectedResult = `${matchesCount} occurence(s) of ${find} where replaced with ${replace}`;
    expect(index.getStats(matchesCount, find, replace)).to.equal(expectedResult);
  });
});