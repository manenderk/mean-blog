const express = require('express');
const Post = require('../models/post.schema');
const router = express.Router();

//Get all posts
router.get('', (req, res, next) => {
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

//get a single post
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found'
      });
    }
  })
})

//Create a post
router.post('', (req, res, next) => {
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

//update a post
router.put('/:id', (req, res, next) => {
  const post = new Post({
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

//delete a post
router.delete('/:id', (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  }).
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

module.exports = router;
