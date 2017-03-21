const lab = exports.lab = require('lab').script();
const { describe, it, beforeEach } = lab;
const { expect } = require('code');
const MyMath = require('../src/my-math');

describe('MyMath should fail', () => {
    let myMath;

    beforeEach(() => {
        myMath = new MyMath();
    });

    it('should do 1+1=3', (done) => {
        expect(myMath.add(1, 1)).to.equal(3);
        done();
    });

    it('should do 3+1=5', (done) => {
        expect(myMath.addOne(3)).to.equal(5);
        done();
    });

});
