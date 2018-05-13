const mainOperations = require('../../statistics/mainOperations');
const normalization = require('../../statistics/normalization');
const graph = require('../../statistics/graph');


/**
 * PrimaryAnalysisController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  analyze: function (req, res) {
    const sampleData = req.body;
    if (!sampleData || !sampleData.length) {
      return res.status(400).json();
    }

    const MarkedCoarseSampleData = normalization.markCoarseValues(sampleData);
    const AnalysisResult = {
      MathExpectation: mainOperations.mathematicalExpectation(sampleData),
      Dispersion: mainOperations.dispersion(sampleData),
      StandartDeviation: mainOperations.standartDeviation(sampleData),
      AssymetryFactor: mainOperations.assymetryFactor(sampleData),
      ExessentialFactor: mainOperations.exessentialFactor(sampleData)
    };
    const withoutCoarseSample = MarkedCoarseSampleData.filter(sample => !sample.key).map(sample => sample.value);
    console.log('Without coarse sample', withoutCoarseSample);
    const WithoutCoarseValuesAnaysisResult = {
      MathExpectation: mainOperations.mathematicalExpectation(withoutCoarseSample),
      Dispersion: mainOperations.dispersion(withoutCoarseSample),
      StandartDeviation: mainOperations.standartDeviation(withoutCoarseSample),
      AssymetryFactor: mainOperations.assymetryFactor(withoutCoarseSample),
      ExessentialFactor: mainOperations.exessentialFactor(withoutCoarseSample)
    };

    return res.status(200).json({
      MarkedCoarseSampleData,
      AnalysisResult,
      WithoutCoarseValuesAnaysisResult
    });
  },
  gistogram: function (req, res) {
    const sampleData = req.body;
    if (!sampleData || !sampleData.length) {
      return res.status(400).json();
    }

    const dividedClassesSample = graph.gistogram.divideByClasses(sampleData);
    // map to previous res structure
    const Classes =  dividedClassesSample.map(c => {
      c.Key = {Lower: c.key.lower, Upper: c.key.upper};
      c.Value = c.value;
      return c;
    });

    return res.status(200).json({Classes});
  }
};

