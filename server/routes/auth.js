const jwt = require('jsonwebtoken');
require('../node_modules/dotenv/config');

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const verifyingResult = jwt.verify(token, process.env.USER_SECRET);
    next();
  } catch (ex) {
    res.status(401).json({ error: 'bad authorization token' });
  }
};

module.exports = auth;
