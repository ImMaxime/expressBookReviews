const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(300).json({message: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  const ISBN = req.params.isbn;
  
  res.status(200).send(books[ISBN])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const asArray = Object.entries(books);
  const authors = Object.fromEntries(asArray.filter(book => book[1].author === req.params.author));
  return res.status(300).json(authors);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const asArray = Object.entries(books);
  const titles = Object.fromEntries(asArray.filter(book => book[1].title === req.params.title));
  return res.status(300).json(titles);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
