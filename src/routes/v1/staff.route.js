const express = require('express');
const validate = require('../../middlewares/validate');
const staffValidation = require('../../validations/staff.validation');
const staffController = require('../../controllers/staff.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(staffValidation.createStaff), staffController.createStaff)
  .get(auth(), validate(staffValidation.getStaff), staffController.getStaff);

router.route('/:staffId').get(auth(), validate(staffValidation.getStaffById), staffController.getStaffById);

module.exports = router;
