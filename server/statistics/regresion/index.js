'use strict';
const mainOperations = require('../mainOperations');
const EmptySampleError = require('../EmptySampleError');

class LinearFunction {
  /**
   * Linear function entity constuction
   * y = b1 + x * b2
   * @param {Number} [b1]
   * @param {Number} [b2]
   */
  constructor (b1 = 0, b2 = 0) {
    this.b1 = b1;
    this.b2 = b2;
  }

  /**
   * Calculate the value of linear function for {x}
   * @param {Number} x
   * @returns {Number}
   */
  calc (x) {
    return this.b1 + this.b2 * x;
  }
}

module.exports = function () {
  function leastSquareMethod (sampleDataPair) {
    if (sampleDataPair.length === 0)
      throw new EmptySampleError();

    const xValues = sampleDataPair.map(pair => pair.key);
    const yValues = sampleDataPair.map(pair => pair.value);

    const xMathExpect = mainOperations.mathematicalExpectation(xValues);
    const yMathExpect = mainOperations.mathematicalExpectation(yValues);

    let firstSum = 0;
    let secondSum = 0;

    for (const value of sampleDataPair) {
      firstSum += (value.value - yMathExpect) * (value.key - xMathExpect);
      secondSum += Math.pow((value.key - xMathExpect), 2);
    }

    let b2;
    if (firstSum === 0 || secondSum === 0)
      b2 = 0;
    else
      b2 = firstSum / secondSum;
    const b1 = yMathExpect - b2 * xMathExpect;

    return new LinearFunction(b1, b2);
  }

  return {
    LinearFunction,
    leastSquareMethod
  };
}();
