const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");

router.get('/', async (req, res) => {
  try {
    let totalAmount = 0 // 計算總金額
    const userId = req.user._id
    const categories = await Category.find().lean()
    const Expenses = await Expense.find({ userId }).lean().sort({ date: 'desc' })

    const expenses = Expenses.map((expense) => {
      const formattedExpense = {
        ...expense,
        categoryIcon: expense.categoryId,
        date: new Date(expense.date).toLocaleString().substring(0, 9),
      };
      totalAmount += expense.amount;
      return formattedExpense;
    })
    res.render('index', { expenses, categories, totalAmount })
  } catch (err) {
    console.log(err)
  }
})

router.get('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const selectCategoryName = req.query.filterSelect

    if (selectCategoryName === 'none') return res.redirect('/') // 選到“類別”就導回首頁

    let totalAmount = 0
    const categories = await Category.find().lean()
    const selectCategory = categories.find(category => {
      return category.name === selectCategoryName
    })
    // 只撈出指定類別的紀錄
    const Expenses = await Expense
      .find({ categoryId: selectCategory.icon, userId })
      .lean()
      .sort({ date: 'desc' })
    console.log(Expenses)
    categories.map(category => {
      return category.isSelected = category.name === selectCategoryName // 新增屬性讓前端知道現在所選的類別為何
    })

    const expenses = Expenses.map((expense) => {
      const formattedExpense = {
        ...expense,
        categoryIcon: selectCategory.icon,
        date: new Date(expense.date).toLocaleString().substring(0, 9),
      };
      totalAmount += expense.amount;
      return formattedExpense;
    })
  

    res.render('index', { expenses, categories, totalAmount, Expenses })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;