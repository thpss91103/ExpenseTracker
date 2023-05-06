const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/users");
const bcrypt = require("bcryptjs");

//login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

//logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "你已經成功登出");
    res.redirect("/users/login");
  });
});

//register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, account, password, confirmPassword } = req.body;
  User.findOne({ account })
    .then((user) => {
      if (user) {
        req.flash("error_msg", "該帳號已經存在！");
        return res.redirect("register");
      }
      if (password !== confirmPassword) {
        req.flash("error_msg", "密碼與確認密碼不同！");
        return res.redirect("register");
      }

      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          User.create({ name, account, password: hash }).then(() => {
            req.flash("success_msg", "您已經成功註冊帳號！");
            res.redirect("/");
          });
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router;