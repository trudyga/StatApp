'use strict';
const mainOperations = require('../mainOperations');
const EmptySampleError = require('../EmptySampleError');

class Range {
  constructor (lower, upper) {
    this.lower = lower;
    this.upper = upper;
  }
}

module.exports = function () {
  /**
   * The method divides sample data into classes and defines the amount of items in each class
   * @param {Array<Number>} sampleData
   * @returns {Array<Object>} Dictionary<Range, int>
    */
  function divideByClasses (sampleData) {
    if (sampleData.length === 0)
      throw new EmptySampleError();

    let amountOfClasses = Math.floor(Math.sqrt(sampleData.length));
    amountOfClasses = amountOfClasses % 2 === 0 ? amountOfClasses - 1 : amountOfClasses;

    const lowerBound = Math.min(...sampleData);
    const higherBound = Math.max(...sampleData);
    const step = (higherBound - lowerBound) / amountOfClasses;

    const divided = [];

    for (let i = 0; i < amountOfClasses; i++) {
      const lower = lowerBound + i * step;
      const upper = lower + step;
      const amountOfValues = sampleData.filter(val => val >= lower && val < upper).length;

      if (upper !== higherBound)
        divided.push({
          key: new Range(lower, upper),
          value: amountOfValues
        });
      else
        divided.push({
          key: new Range(lower, upper),
          value: amountOfValues + 1
        });
    }

    return divided;
  }

  return {
    gistogram: {
      divideByClasses
    },
    Range
  };
}();
