const express = require('express');
const router = express.Router();
const User = require('../models/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

    user.save().then(result => {
      res.status(201).json({
        status: 'success',
        message: 'user created',
        result: result
      })
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    })
  });

});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(!user){
      return res.status(401).json({
        status: 'error',
        message: 'Auth Failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        status: 'error',
        message: 'Auth Failed'
      });
    }

    const token = jwt.sign({
      email: fetchedUser.email,
      userId: fetchedUser._id
    },
    'this_is_my_server_secret_key_which_should_be_hidden',
    {expiresIn: '1h'});

    return res.status(200).json({
      status: 'success',
      token: token
    });
  }).catch(
    err => {
      return res.status(501).json({
        status: 'error',
        error: err
      })
    }
  );

});

module.exports = router;
