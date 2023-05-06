const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");

router.get("/:category", (req, res) => {
  const category = req.params.category;
  const userId = res.locals.user._id;
  Category.findOne({ name: category }).then((category) => {
    const categoryId = category._id;

    return Expense.find({ userId, categoryId })
      .lean()
      .sort({ date: "desc" })
      .then((expenses) => {
        let totalAmount = 0;
        const formattedExpenses = expenses.map((expense) => {
          totalAmount += expense.amount;
          expense.date = new Date(expense.date).toLocaleString().substring(0, 9);
          expense.categoryIcon = category.icon;
          return expense;
        });
        res.render("index", { records: formattedExpenses, totalAmount });
      });
  });
});

module.exports = router;