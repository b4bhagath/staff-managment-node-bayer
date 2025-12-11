const catchAsync = require('../utils/catchAsync');
const { authService, tokenService } = require('../services');

const adminLogin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginAdminWithUsernameAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

module.exports = {
  adminLogin,
};
