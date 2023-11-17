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
  const valid = isValid.filter((user) => user.username === username && user.password === password);
  return valid.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(username === '' || password === '')
    return res.status(401).json({message: "Please provide all the informations"});
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
