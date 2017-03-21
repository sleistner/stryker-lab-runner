'use strict';

function MyMath() {

}

MyMath.prototype.add = (num1, num2) => {
    return num1 + num2;
};

MyMath.prototype.addOne = (number) => {
    number++;
    return number;
};

MyMath.prototype.negate = (number) => {
    return -number;
};

MyMath.prototype.isNegativeNumber = (number) => {
    let isNegative = false;
    if (number < 0) {
        isNegative = true;
    }
    return isNegative;
};

module.exports = MyMath;
