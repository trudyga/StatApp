'use strict';
const mainOperations = require('./mainOperations');
const EmptySampleError = require('./EmptySampleError');

module.exports = function () {
  /**
   * Method marks coarse values in sample numeric data with boolean key
   * @param sampleData
   * @returns {Array<Object>} List of Pairs with boolean key that indicates weather value is coarse or not
   */
  function markCoarseValues (sampleData) {
    if (sampleData.length === 0)
      throw new EmptySampleError();

    const markedSample = [];

    const mathExpectation = mainOperations.mathematicalExpectation(sampleData);
    const deviation = mainOperations.standartDeviation(sampleData);
    const kvantil = 1.96;

    for (const value of sampleData) {
      const t = Math.abs(value - mathExpectation) / deviation;
      markedSample.push({
        key: t >= kvantil,
        value
      });
    }

    return markedSample;
  }

  return {
    markCoarseValues
  };
}();
