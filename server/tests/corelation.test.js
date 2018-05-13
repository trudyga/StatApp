'use strict';

const corelation = require('../statistics/corelation');
const chai = require('chai');
const expect = chai.expect;
chai.should();

describe('Corelation Test', function () {
  describe('#cendalMethod', function () {
    it('Should throw Error if was empty sample data was passed', function () {
      const sampleData = [];

      expect(() => corelation.cendalMethod(sampleData)).to.throw(Error);
    });

    it('Should give correct answer for liner correlated values', function () {
      const sampleData = [];
      for (let i = 0; i < 10; i++) {
        sampleData.push({key: i+1, value: i+1});
      }
      console.log('sampleData', sampleData);

      const result = corelation.cendalMethod(sampleData);
      result.should.be.equal(1);
    });

    it('Should give correct answer for liner correlated values in reverse order', function () {
      const sampleData = [];
      for (let i = 0; i < 10; i++) {
        sampleData.push({key: i+1, value: 10 - i});
      }
      console.log('sampleData', sampleData);

      const result = corelation.cendalMethod(sampleData);
      result.should.be.equal(0);
    });
  });
});
