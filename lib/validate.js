const Joi = require("joi");

const newAdVerification = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  des: Joi.string().min(20).required(),
  price : Joi.string().alphanum().required(),
  location : Joi.string().alphanum().required()
})




// try {
//   const value = await schema.validateAsync({
//     username: "abc",
//     birth_year: 1994,
//   });
// } catch (err) {}

module.exports = {
    newAdVerification
}