const httpStatus = require('http-status');
const { Staff } = require('../models');
const ApiError = require('../utils/ApiError');

const createStaff = async (staffBody) => {
  if (await Staff.isEmailTaken(staffBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Staff.create(staffBody);
};

const queryStaff = async (filter, options) => {
  const staff = await Staff.paginate(filter, options);
  return staff;
};

const getStaffById = async (id) => {
  return Staff.findById(id);
};

module.exports = {
  createStaff,
  queryStaff,
  getStaffById,
};
