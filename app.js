const express = require("express");
const exphbs = require("express-handlebars");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const router = require("./routes");

require("./config/mongoose");

const methodOverride = require("method-override");
const session = require("express-session");
const usePassport = require("./config/passport");


const flash = require("connect-flash");

const PORT = process.env.PORT;
const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      match: (a, b) => a === b,
    },
  })
);
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
  })
);
usePassport(app);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg").length
    ? req.flash("error_msg")
    : req.flash("error");

  next();
});

app.use(router);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));