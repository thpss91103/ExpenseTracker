const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'account', passReqToCallback: true }, (req, account, password, done) => {
    User.findOne({ account })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', '這Email沒有被註冊過。'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email 或 Password 錯誤。'))
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};