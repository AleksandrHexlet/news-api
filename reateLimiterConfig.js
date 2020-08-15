const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 100 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});
