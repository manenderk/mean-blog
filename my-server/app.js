const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: '1',
      title: 'First Title from Server',
      content: 'This is some content'
    },
    {
      id: '2',
      title: 'First Second from Server',
      content: 'This is some content'
    },
    {
      id: '3',
      title: 'First Third from Server',
      content: 'This is some content'
    },
  ];
  res.status(200).json({
    message: 'success',
    posts: posts
  });
})



module.exports = app;
