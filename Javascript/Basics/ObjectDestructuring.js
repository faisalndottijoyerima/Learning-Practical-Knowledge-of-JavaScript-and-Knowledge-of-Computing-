//create a book object with array
const book = {
    title : "The Great Gotsby",
    author : "F. Scott Fitzgerald",
    year : 1925,
    genre :["Novel", "programming", "Software Engineering", "web development", "mobile development", "data science"]
};

console.log("This is a Book Object:", book);

// destructuring to extract title and author from book object
const {title, author} = book;
console.log("This is the title of the book: ", title);
console.log("This is the author of the book:", author);

//use spread to create a new book with different year
const newbook = {...book, year: 2026, genre: [...book.genre, "Artificial Intelligence"], title: "lekson book", price: 5000};
console.log("this is a new book with spread operator:", newbook);

//function that accept destructured parameters
function printbookInfo({title, author, year}) {
    console.log(`\nbook Info Function:`);
    console.log(`${title} was written by ${author} in the year ${year}.`);
}

printbookInfo(book);

//combine two Object using spread operator
const extractInfor = {
    isbn: "978-3-16-148410-0",
    publisher: "lekson",
    pages: 180 

};
const combinedBook = {...book, ...extractInfor};
console.log("Combined Book Object:", combinedBook);

