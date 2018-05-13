'use strict';

const mainOperations = require('../statistics/mainOperations');
const chai = require('chai');
const expect = chai.expect;
chai.should();

describe('Main Operations Tests', function () {
  describe('#mathematicalExpectation', function () {
    it('Should throw Error if empty sample was passed it', function () {
      const sample = [];

      expect(() => mainOperations.mathematicalExpectation(sample)).to.throw(Error);
    });

    it('Should return correct value', function () {
      const sample = [1, 2, 3, 4, 5];

      const result = mainOperations.mathematicalExpectation(sample);
      result.should.be.equal(3);
    });
  });

  describe('#dispersion', function () {
    it('Should throw Error if empty sample was passed it', function () {
      const sample = [];

      expect(() => mainOperations.dispersion(sample)).to.throw(Error);
    });

    it('Should return correct value', function () {
      let sample = [1, 2, 3, 4, 5];

      const result = mainOperations.dispersion(sample);
      result.should.be.equal(2.5);
    });
  });

  describe('#standartDeviation', function () {
    it('Should throw Error if empty sample was passed it', function () {
      const sample = [];

      expect(() => mainOperations.standartDeviation(sample)).to.throw(Error);
    });

    it('Should return correct value', function () {
      let sample = [1, 2, 3, 4, 5];

      const result = mainOperations.standartDeviation(sample);
      result.should.be.closeTo(1.581, 0.001);
    });
  });

  describe('#assymetryFactor', function () {
    it('Should throw Error if empty sample was passed it', function () {
      const sample = [];

      expect(() => mainOperations.assymetryFactor(sample)).to.throw(Error);
    });

    it('Should return correct value', function () {
      let sample = [1, 2, 3, 4, 5];

      const result = mainOperations.assymetryFactor(sample);
      result.should.be.equal(0);
    });
  });

  describe('#exessentialFactor', function () {
    it('Should throw Error if empty sample was passed it', function () {
      const sample = [];

      expect(() => mainOperations.exessentialFactor(sample)).to.throw(Error);
    });
  });
});
