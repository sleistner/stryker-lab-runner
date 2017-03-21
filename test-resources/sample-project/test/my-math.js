const lab = exports.lab = require('lab').script();
const { describe, it, beforeEach } = lab;
const { expect } = require('code');
const MyMath = require('../src/my-math');

describe('MyMath', () => {
    let myMath;

    beforeEach((done) => {
        try {
            myMath = new MyMath();
        } catch (err) {
            console.error(err);
        }
        done();
    });

    it('should be able to add two numbers', (done) => {
        const num1 = 2;
        const num2 = 5;
        const expected = num1 + num2;

        const actual = myMath.add(num1, num2);

        expect(actual).to.equal(expected);
        done();
    });

    it('should be able 1 to a number', (done) => {
        const number = 2;
        const expected = 3;

        const actual = myMath.addOne(number);

        expect(actual).to.equal(expected);
        done();
    });

    it('should be able negate a number', (done) => {
        const number = 2;
        const expected = -2;

        const actual = myMath.negate(number);

        expect(actual).to.equal(expected);
        done();
    });

    it('should be able to recognize a negative number', (done) => {
        const number = -2;

        const isNegative = myMath.isNegativeNumber(number);

        expect(isNegative).to.equal(true);
        done();
    });

    it('should be able to recognize that 0 is not a negative number', (done) => {
        const number = 0;

        const isNegative = myMath.isNegativeNumber(number);

        expect(isNegative).to.equal(false);
        done();
    });
});
