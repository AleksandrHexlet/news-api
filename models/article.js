const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const validator = require('validator');

const uniqueValidator = require('mongoose-unique-validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: 'Please send your name',
    select: false,
    // если задать select: false , тогда API не будет возвращать _id пользователя
  },

});
articleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('article', articleSchema);
