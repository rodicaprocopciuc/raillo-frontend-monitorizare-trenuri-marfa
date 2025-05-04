const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token lipsă.' });

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalid.' });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;