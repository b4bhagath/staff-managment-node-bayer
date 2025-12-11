const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { staffService } = require('../services');

const createStaff = catchAsync(async (req, res) => {
  const staff = await staffService.createStaff(req.body);
  res.status(httpStatus.CREATED).send(staff);
});

const getStaff = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await staffService.queryStaff(filter, options);
  res.send(result);
});

const getStaffById = catchAsync(async (req, res) => {
  const staff = await staffService.getStaffById(req.params.staffId);
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Staff not found');
  }
  res.send(staff);
});

module.exports = {
  createStaff,
  getStaff,
  getStaffById,
};
