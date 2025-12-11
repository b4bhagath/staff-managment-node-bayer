const Joi = require('joi');

const createStaff = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    role: Joi.string().valid('nurse', 'doctor', 'technician', 'admin').required(),
    shiftPreferences: Joi.array().items(Joi.string()).default([]),
  }),
};

const getStaff = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string().valid('nurse', 'doctor', 'technician', 'admin'),
    email: Joi.string().email(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStaffById = {
  params: Joi.object().keys({
    staffId: Joi.string().required(),
  }),
};

module.exports = {
  createStaff,
  getStaff,
  getStaffById,
};
