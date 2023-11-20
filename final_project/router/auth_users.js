const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: "admin", password: "123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  return users.filter((user) => user.username === username).length > 0; 
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  const valid = users.filter((user) => user.username === username && user.password === password);
  return valid.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(username === '' || password === '')
    return res.status(401).json({message: "Please provide all the informations"});
  if(!authenticatedUser(username, password))
    return res.status(401).json({message: "Username or Password is incorrect"});

  let accessToken = jwt.sign({
    data: password
  }, 'access', { expiresIn: 60 * 60 });
  req.session.authorization = {
    accessToken,username
  }
  return res.status(200).json({
    "message": "User successfully logged in",
    "session" : req.session
  });
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const user = req.body.username;
  const book = books[req.params.isbn];
  const review = req.query.review;
  if(!review) return res.status(404).json({message: "Please write a review."});
  if(!book) return res.status(404).json({message: "Book could not be found."});
  console.log(book);
  book.reviews[user] = review;
  return res.status(200).json({
    message: "User Successfully reviewed the book!",
    book: book
  });
});

regd_users.delete("/auth/review/:isbn?", (req, res) => {
  const user = req.body.username;
  const book = books[req.params.isbn];
  if(!book) 
    return res.status(404).json({message: "Book could not be found."});
  delete book.reviews[user];
  return res.status(200).json({
    message: "User Successfully deleted is review!",
    book: book
  });
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
