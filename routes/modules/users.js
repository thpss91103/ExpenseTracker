const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/users");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);


router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "你已經成功登出");
    res.redirect("/users/login");
  });
});


router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, account, password, confirmPassword } = req.body;
  const errors = []
  if (!name || !account || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      account,
      password,
      confirmPassword
    })
  }
  User.findOne({ account })
    .then((user) => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        res.render("register", {
          errors,
          name,
          account,
          password,
          confirmPassword
        });
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          account,
          password: hash 
        }))
        .then(() => {res.redirect("/")});
    })
    .catch((err) => console.log(err));
});

module.exports = router;