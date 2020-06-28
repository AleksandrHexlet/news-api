
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/users");
 const {
   BadAuthenticationError,
   AccessDenied,
   BadEmail,

} = require("../constructorError/error");
const { JWT_SECRET } = require("../config");
 
 const { NODE_ENV } = process.env;
 
 module.exports.getUser = (req, res, next) => {
     .catch(next);
 };
 

 module.exports.createUser = (req, res, next) => {

  const { email, password, name } = req.body;
   bcrypt.hash(password, 10).then((hash) => {
     user
       .create({
 module.exports.createUser = (req, res, _next) => {
       .catch(() => {
      const err = new BadEmail("Не удалось создать пользователя.");
         return next(err);
       });
   });
module.exports.createUser = (req, res, next) => {
 
 module.exports.login = (req, res, next) => {
   const { email, password } = req.body;

 user
   .findOne({ email })
  .select("+password")
     .then((newUser) => {
       if (!newUser) {
      throw new BadAuthenticationError("Неправильные почта или пароль");
       }
   return bcrypt.compare(password, newUser.password).then((matched) => {
        if (!matched) {
          throw new AccessDenied("Неправильные почта или пароль");
        }
        const token = jwt.sign(
          { _id: newUser._id },
          NODE_ENV === "production" ? JWT_SECRET : "JWT_SECRET",
          { expiresIn: "7d" }
        );
        const { email, name } = newUser;
        return res.send({ email, name, token });
      });
     })
     .catch(next);
 }
