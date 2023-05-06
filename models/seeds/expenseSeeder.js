if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const db = require("../../config/mongoose");
const User = require("../User");
const Category = require("../category");
const Expense = require("../expense");
const bcrypt = require("bcryptjs");
const user = { name: "dad", password: "000000" };
const expense = [
  { name: "房租", date: "2023/03/05", amount: 15000, category: "家居物業" },
  { name: "月票", date: "2023/03/08", amount: 1280, category: "交通出行" },
  { name: "電影票", date: "2023/03/15", amount: 450, category: "休閒娛樂" },
  { name: "午餐", date: "2023/03/02", amount: 100, category: "餐飲食品" },
  { name: "禮金", date: "2023/03/25", amount: 3600, category: "其他" },
];

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => User.create({ name: user.name, password: hash }))
    .then((user) => {
      const userId = user._id;
      return Promise.all(
        Array.from(expense, (expense) => {
          return Category.findOne({ name: expense.category }).then(
            (category) => {
              const categoryId = category._id;
              return Expense.create({
                ...expense,
                userId,
                categoryId,
              });
            }
          );
        })
      );
    })
    .then(() => {
      console.log("recordSeeder is done!");
      process.exit();
    })
    .catch((err) => console.log(err));
});