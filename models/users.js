const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
    // eslint-disable-next-line max-len
    // если задать select: false , тогда API не будет возвращать хеш пароля. Поэтому в controllers.users  в функции login
    // eslint-disable-next-line max-len
    // в строке поиска email ===> user.findOne ({email}).select('+password') надо к findOne добавить .select ('+password')
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
