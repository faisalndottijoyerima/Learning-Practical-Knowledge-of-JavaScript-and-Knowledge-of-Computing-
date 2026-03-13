const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



console.log("This is an array of numbers: ", number);

//use map to square a numbe
const square = number.map(num => num * num);
console.log("This is a square of number: ", square);

//use filter to show number is greater than 50
const above50 = square.filter(num => num > 50);
console.log("This is filtered numbers above 50: ", above50);

// use reduce to find a sum 
const totalsum = square.reduce((sum,num) => sum + num, 0);
console.log("This is a Reduce of square number:", totalsum);

//use reduce to find sum of number above50
const sumabove50 = square.reduce((sum, num) => sum + num > 50);
console.log("Total Sum Above 50:",sumabove50);

//create an array of different product
const product = [
    {name: "T-Shirt", price: 2.000},
    {name: "Maggi",   price: 1.500},
    {name: "Daddawa", price: 500},
    {name: "Toothpaste", price: 800},
    {name: "sugar", price: 4.000},
    {name: "chocolate", price:700}
];

console.log(product);