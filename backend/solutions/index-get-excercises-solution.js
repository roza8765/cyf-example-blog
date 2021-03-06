const path = require('path');
const express = require('express');
const cors = require('cors');
const { database } = require('./database');

const server = express();
const port = 3001;

server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
server.use(express.json());
server.use(cors())

server.get('/posts',  (req, res) => {
  res.json(database.posts)
});

server.get('/posts/:postId',  (req, res) => {
  const { postId } = req.params;
  const post = database.posts.find(p => p.id === parseInt(postId));
  res.json(post)
});

//1. retrieve all the posts of a given user

//What is the URL of this endpoint?
// Relation: The user has posts, and not another way around, and just one can be many (plural)
// so the endpoint will be: /users/{user_id}/posts

server.get('/users/:userId/posts',  (req, res) => {
  const { userId } = req.params;
  const posts = database.posts.filter(p => p.user_id === parseInt(userId));
  res.json(posts)
});

//2. retrieve one single post of a given user

//What is the URL of this endpoint?
//Relation: The user has posts, and we need one of them (singular)
// so the endpoint will be: /users/{user_id}/posts/{post_id}

server.get('/users/:userId.json/posts/:postId',  (req, res) => {
  const { userId, postId } = req.params;
  const posts = database.posts.filter(p => p.user_id === parseInt(userId));
  const post = posts.find(p => p.id === parseInt(postId));
  res.json(post)
});


server.listen(port, () => console.log(`[MockServer] listening at http://localhost:${port}`));

