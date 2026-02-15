function createMultiplier(multiplier) {
    return function (number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
console.log(double(5)); // 10
const triple = createMultiplier(3);
console.log(triple(5)); // 15

