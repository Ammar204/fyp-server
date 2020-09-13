const Joi = require("joi");
const { options } = require("joi");

const newAdVerification = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  des: Joi.string().min(20).required(),
  price : Joi.string().alphanum().required(),
  location : Joi.string().alphanum().required()
})

const newUserVerification = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  pass: Joi.string().required(),
  firstName : Joi.string().alphanum().required(),
  lastName : Joi.string().alphanum().required(),
  email : Joi.string().required(),
  phoneNo : Joi.string().required(),
  city : Joi.string().alphanum().required(),
  state : Joi.string().alphanum().required(),
  country : Joi.string().alphanum().required(),
}).unknown(true)



// try {
//   const value = await schema.validateAsync({
//     username: "abc",
//     birth_year: 1994,
//   });
// } catch (err) {}

module.exports = {
    newAdVerification,
    newUserVerification
}