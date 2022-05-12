const Joi = require('joi')

export const registerValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(40)
      .required()
      .email(),
    pseudo: Joi.string()
      .min(2)
      .max(30)
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  })
  return schema.validate(data)
}

export const loginValidation = data => {
  const schema = Joi.object({
      email: Joi.string()
          .min(5)
          .max(40)
          .required()
          .email(),
      password: Joi.string()
          .min(6)
          .max(30)
          .required()
  })
  return schema.validate(data)
}