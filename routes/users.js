const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getUser } = require('../controllers/users');

router.get(
  '/users/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string()
          .required()
          .custom((value, helpers) => {
            if (!validator.isEmail(value)) {
              return helpers.message('email is wrong');
            }
            return value;
          }),
      }),
  }),
  getUser,
);


module.exports = router;
