'use strict';
const EmptySampleError = require('./EmptySampleError');

/**
 * @typedef {Array<Number>} SampleData
 */

/**
 * @namespace mainOperations
 */
module.exports = function () {
  /**
   * Method calculates mathematical expectation value of the sample data list
   * @param {SampleData} sampleData
   * @returns {number}
   */
  function mathematicalExpectation (sampleData) {
    if (sampleData.length === 0)
      throw new EmptySampleError();

    return sampleData.reduce((sum, val) => sum+val, 0)/sampleData.length;
  }

  /**
   * Method calculates standard square deviation value of the sample data list
   * @param {SampleData} sampleData
   * @returns {number}
   */
  function standartDeviation (sampleData) {
    if (sampleData.length === 0)
      throw new EmptySampleError();

    return Math.sqrt(dispersion(sampleData));
  }

  /**
   * Method calculates dispersion value of the sample data list
   * @param {SampleData} sampleData
   * @returns {number}
   */
  function dispersion (sampleData) {
    if (sampleData.length === 0)
      throw new EmptySampleError();

    let n = sampleData.length;
    let sum = 0;
    let mathExpect = mathematicalExpectation(sampleData);

    for (const value of sampleData) {
      sum += Math.pow((value - mathExpect), 2);
    }

    return sum / (n - 1);
  }

  /**
   * Method calculates assymetry factor of the sample data list
   * @param {SampleData} sampleData
   * @returns {number}
   */
  function assymetryFactor (sampleData) {
    if (sampleData.length === 0)
      throw new EmptySampleError();

    const n = sampleData.length;
    const stdDeviation = standartDeviation(sampleData);
    const mathExpect = mathematicalExpectation(sampleData);

    let sum = 0;
    for (const value of sampleData) {
      sum += Math.pow((value - mathExpect), 3);
    }

    const result = sum / (n * Math.pow(stdDeviation, 3));
    return result;
  }

  /**
   * Method calculates exessential factor of the sample data list
   * @param {SampleData} sampleData
   * @returns {number}
   */
  function exessentialFactor (sampleData) {
    if (sampleData.length === 0)
      throw new EmptySampleError();

    const n = sampleData.length;
    const stdDeviation = standartDeviation(sampleData);
    const mathExpect = mathematicalExpectation(sampleData);

    let sum = 0;
    for (const value of sampleData) {
      sum += Math.pow((value - mathExpect), 4);
    }

    const result = sum / (n * Math.pow(stdDeviation, 4));
    return result;
  }

  return {
    mathematicalExpectation,
    standartDeviation,
    dispersion,
    assymetryFactor,
    exessentialFactor
  };
}();
