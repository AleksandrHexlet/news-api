/* eslint-disable linebreak-style */
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const router = require('./routes');
// const centralError = require('./constructorError/centralError');

const { DATABASE_URL } = require('./configMongo');
const { limiter } = require('./reateLimiterConfig');

const { PORT } = require('./config');

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      'http://news-today.site/',
      'https://news-today.site/',
      'https://www.news-today.site/',
      'http://www.news-today.site/',
      'https://github.com/AleksandrHexlet',
    ],
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());


mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true, // создаём уникальный индекс в монго
});

app.use(requestLogger);
app.use(limiter);
app.use('/', router);

// app.use(centralError);
router.use((req, res) => {
  res.status(400).send({ message: 'Запрашиваемый ресурс не найден' });
});


app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка на сервере' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started in ${PORT}`);
});
