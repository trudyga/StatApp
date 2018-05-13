'use strict';

const regression = require('../statistics/regresion');
const chai = require('chai');
const expect = chai.expect;
chai.should();

describe('Regression Tests', function () {
  describe('#leastSquareMethod', function () {
    it('Should throw Error if was empty sample data was passed', function () {
      const sampleData = [];

      expect(() => regression.leastSquareMethod(sampleData)).to.throw(Error);
    });

    it('Should give correct answer for liner correlated values', function () {
      const sampleData = [
        {key:60.0, value: 170.0},
        {key:70.0, value: 170.0},
        {key:80.0, value: 181.0}
        ];

      const result = regression.leastSquareMethod(sampleData);
      result.b1.should.be.closeTo(135.16, .01);
      result.b2.should.be.equal(0.55);
    });
  });
});
