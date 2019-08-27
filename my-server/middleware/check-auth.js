const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'this_is_my_server_secret_key_which_should_be_hidden');
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'authentication failed'
    })
  }
};
