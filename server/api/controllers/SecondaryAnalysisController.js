const correlation = require('../../statistics/corelation');
const regresion = require('../../statistics/regresion');

/**
 * SecondaryAnalysisController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  linearFunction: function (req, res) {
    const samplePairs = req.body.map(pair => {
      pair.value = +pair.Value;
      pair.key = +pair.Key;
      return pair;
    });
    console.log('Calculate Linear Function', samplePairs);

    if (samplePairs.length < 2) {
      return res.status(400).send('Sample should contain at least 2 pairs');
    }

    const linearFunction = regresion.leastSquareMethod(samplePairs);

    return res.status(200).json({
      B1: linearFunction.b1,
      B2: linearFunction.b2
    });
  },
  correlation: function (req, res) {
    const samplePairs = req.body.map(pair => {
      pair.value = +pair.Value;
      pair.key = +pair.Key;
      return pair;
    });
    console.log('Calculate Corelation', req.body);

    if (samplePairs.length < 2) {
      return res.status(400).send('Sample should contain at least 2 pairs');
    }

    return res.status(200).json(correlation.cendalMethod(samplePairs).toString());
  }
};

