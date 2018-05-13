'use strict';
const mainOperations = require('../mainOperations');
const EmptySampleError = require('../EmptySampleError');

/**
 * @namespace corelation
 * @type {{cendalMethod}}
 */
module.exports = function () {
  /**
   * Calculation corelation coeficient by applying candal method to list of numeric value pairs
   */
  function cendalMethod (sampleDataPair) {
    if (sampleDataPair.length === 0)
      throw new EmptySampleError();

    // result is (firstSum + secondsSum)/(amount*(amount - 1))
    return coefWithAbnormDistr(sampleDataPair);
  }

  /**
   * Return Cendal Coeficient with abnormal distribution
   * @param {Array<Object>} sampleDataPair
   */
  function coefWithAbnormDistr (sampleDataPair) {
    let rangValX = [];
    let rangValY = [];
    let rang = 0;

    sampleDataPair = sampleDataPair.sort((l, r) => l.value - r.value);
    let val;

    for (let i = 0; i < sampleDataPair.length - 1; i++) {
      val = -1;
      for (let j = i + 1; j < sampleDataPair.length; j++) {
        if (sampleDataPair[j].key > sampleDataPair[i].key) {
          val = 1;
          break;
        }
      }
      rangValX.push(val);
    }
    rangValX.push(-1);

    sampleDataPair = sampleDataPair.sort((l, r) => l.key - r.key);
    for (let i = 0; i < sampleDataPair.length - 1; i++) {
      val = -1;
      for (let j = i + 1; j < sampleDataPair.length; j++) {
        if (sampleDataPair[j].value > sampleDataPair[i].value) {
          val = 1;
          break;
        }
      }
      rangValY.push(val);
    }
    rangValY.push(-1);


    console.log(rangValX, rangValY);
    for (let i = 0; i < sampleDataPair.length; i++)
      rang += (rangValX[i] + rangValY[i]);

    return (2.0 * rang) / (sampleDataPair.length * (sampleDataPair.length - 1));
  }

  return {
    cendalMethod
  };
}();
