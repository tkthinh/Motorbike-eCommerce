const authUtil = require("../util/authentication");

const User = require("../models/user");

function getSignup(req, res) {
  res.render("user/auth/signup");
}

async function signup(req, res) {
  const user = new User(req.body.email, req.body.password, req.body.name);

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("user/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.findUserWithEmail();

  if (!existingUser) {
    res.redirect("/login");
    console.log("khong tim thay nguoi dung");
    return;
  }

  const passwordIsCorrect = await user.comparePassword(existingUser.password);
  if (!passwordIsCorrect) {
    res.redirect("/login");
    console.log("sai mat khau");
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.deleteUserAuthSession(req);
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  logout: logout,
};
