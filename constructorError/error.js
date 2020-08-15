/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
class BadAuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}


class AccessDenied extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class IdNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class BadEmail extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  BadRequestError,
  BadAuthenticationError,
  IdNotFoundError,
  AccessDenied,
  BadEmail,
};
