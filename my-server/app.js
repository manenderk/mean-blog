const express = require('express');
const bodyParser = require('body-parser');
const Credentials = require('./credentials');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

const app = express();

app.use(bodyParser.json());

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

app.use('/api/posts', postRoutes);

module.exports = app;
