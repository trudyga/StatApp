const graph = require('../statistics/graph');
const chai = require('chai');
const expect = chai.expect;
chai.should();

describe('Graph operation tests', function () {
  describe('#gistogram', function() {
    it('Should throw an error if empty sample data was passed', function () {
      const sample = [];

      expect(() => graph.gistogram.divideByClasses(sample)).to.throw(Error);
    });

    it('Sample Data Should be divided into square root amount of classes related to data passed in 1', function () {
      const sample = [1,2,3,4,5,6,7,8,9,10];

      const classesList = graph.gistogram.divideByClasses(sample);
      let amountOfClasses = Math.floor(Math.sqrt(sample.length));
      amountOfClasses = amountOfClasses % 2 == 0 ? amountOfClasses - 1 : amountOfClasses;

      classesList.should.be.have.lengthOf(amountOfClasses);
    });

    it('Sample Data Should be divided into square root amount of classes related to data passed in 2', function () {
      const sample = [1,2,3,4,5,6,-2, 32,13, 131,131];

      const classesList = graph.gistogram.divideByClasses(sample);
      let amountOfClasses = Math.floor(Math.sqrt(sample.length));
      amountOfClasses = amountOfClasses % 2 == 0 ? amountOfClasses - 1 : amountOfClasses;

      classesList.should.be.have.lengthOf(amountOfClasses);
    });

    it('Aggregated amount of values stored in different classes should be the same as amount of data samples', function () {
      const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const classes = graph.gistogram.divideByClasses(sample);

      const amountOfValues = classes.reduce((sum, item) => sum + item.value, 0);
      amountOfValues.should.be.equal(sample.length);
    });
  });
});
it('Should throw Error if was empty sample data was passed', function () {

});
