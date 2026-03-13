function processNumber(number, callback) {
    return callback(number);
}

// Callback function
function square(num) {
    return num * num;
}

// Example usage
const result = processNumber(5, square);
console.log(result); // 25
