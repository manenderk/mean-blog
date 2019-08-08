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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().
  then((result) => {
    res.status(201).json({
      message: 'success',
      id: result._id
    })
  }).
  catch(() => {
    res.status(500).json({
      message: 'error'
    });
  });
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
    res.status(200).json({
      message: 'success'
    });
  }).
  catch(() => {
    res.status(500).json({
      message: 'error'
    })
  });
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post ({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({
    _id: post._id
  }, post).
  then((result) => {
    res.status(200).json({
      message: 'success'
    })
  }).
  catch(() => {
    res.status(500).json({
      message: 'error'
    })
  });
});

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then( (post) => {
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message: 'Post not found'});
    }
  })
})

module.exports = app;
