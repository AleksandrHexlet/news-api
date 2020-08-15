const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const routerArticles = require('./articles');
const routerUsers = require('./users');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        name: Joi.string().required().min(2).max(30),
      }),
  }),
  createUser,
);

router.use(auth);

router.use(routerArticles);
router.use(routerUsers);

// router.use((req, res) => {
//   res.status(400).send({ message: 'Запрашиваемый ресурс не найден' });
// });

module.exports = router;
