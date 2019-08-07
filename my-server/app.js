const express = require('express');
const bodyParser = require('body-parser');
const Credentials = require('./credentials');
const mongoose = require('mongoose');
const Post = require('./models/post.schema');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

mongoose.set('useNewUrlParser', true);

mongoose.connect('mongodb+srv://' + Credentials.user + ':' + Credentials.password + '@mean-blog-axtcy.mongodb.net/mean-blog?retryWrites=true&w=majority')
.then(() => console.log('Connected to database'))
.catch(() => console.log('Connection failed'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save();

  res.status(201).json({
    message: 'success',
    id: post._id
  })
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
  .then((documents) => {
    res.status(200).json({
      message: 'success',
      posts: documents
    });
  })
  .catch(() => {
    res.status(500).json({
      message: 'error'
    })
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).
  then((result) => {
    //console.log(result);
    res.status(200).json({
      message: 'success'
    });
  });
});


module.exports = app;
