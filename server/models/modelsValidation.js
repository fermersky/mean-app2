const Joi = require('@hapi/joi');

const postHintValidateAsync = async (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(6).max(155),
    tags: Joi.array(),
    user_id: Joi.string().required(),
    author: Joi.string().required(),
  });

  return await schema.validateAsync(data);
};

const putHintValidateAsync = async (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required().min(6).max(155),
    tags: Joi.array(),
  });

  return await schema.validateAsync(data);
};

const registerUserValidateAsync = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().min(3).max(40).required().email(),
    password: Joi.string().min(3).required(),
  });

  return await schema.validateAsync(data);
};

const loginUserValidateAsync = async (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(40).required().email(),
    password: Joi.string().min(3).required(),
  });

  return await schema.validateAsync(data);
};

module.exports = {
  postHintValidateAsync,
  putHintValidateAsync,
  registerUserValidateAsync,
  loginUserValidateAsync,
};
