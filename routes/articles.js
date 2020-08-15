/* eslint-disable linebreak-style */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getArticles,
  createArticles,
  deleteArticle,
  checkArticleBelongUser,
  doesArticleExist,
} = require('../controllers/articles');

router.get('/articles', getArticles);

router.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!validator.isURL(value)) {
            return helpers.message('link is not url');
          }
          return value;
        }),
      image: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!validator.isURL(value)) {
            return helpers.message('image is not url');
          }
          return value;
        }),
    }),
  }),
  createArticles,
);
router.delete(
  '/articles/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string()
        .alphanum()
        .length(24)
        .regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  doesArticleExist,
  checkArticleBelongUser,
  deleteArticle,
);


module.exports = router;
