// const validator = require('validator');
const article = require('../models/article');
const { BadRequestError } = require('../constructorError/error');
const { IdNotFoundError } = require('../constructorError/error');


module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  article
    .find({ owner })
    .then((articles) => res.send({ data: articles }))
  // .catch(next);
    .catch(() => {
      const err = new BadRequestError('Статьи не существуют');
      return next(err);
    });
};


module.exports.createArticles = (req, res, next) => {
  const owner = req.user._id;

  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  article
    .create({
      keyword, title, text, date, source, link, image, owner,
    })
    .then((articles) => res.send({ data: articles }))
    // .catch(next);
    .catch(() => {
      const err = new BadRequestError('Не возможно создать статью');
      return next(err);
    });
};

module.exports.doesArticleExist = (req, res, next) => {
  article
    .findById(req.params.articleId)
    .then((checkArticle) => {
      if (!checkArticle) {
        throw new IdNotFoundError('Не возможно удалить статью.Cтатьи не существует');
      }
      next();
    })
    .catch(next);
};

module.exports.checkArticleBelongUser = (req, res, next) => {
  article
    .findById(req.params.articleId)
    .select('+owner')
    .then((checkArticle) => {
      const { owner } = checkArticle;
      const superOwner = String(owner);
      if (req.user._id !== superOwner) {
        throw new BadRequestError(
          'Чтобы удалить статью, вам необходимо быть её владельцем',
        );
      }
      next();
    })

    .catch(next);
};


module.exports.deleteArticle = (req, res, next) => {
  article
    .findByIdAndRemove(req.params.articleId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    })
    // .catch(() => {
    //   const err = new IdNotFoundError('Не возможно удалить статью');
    //   return next(err);
    // });
    .catch(next);
};
