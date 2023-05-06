const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");
const category = require("../../models/category");


router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/", (req, res) => {
  const { name, date, category, amount} = req.body;
  const userId = req.user._id;
  Category.findOne({ name: category })
    .lean()
    .then((category) => {
      const categoryId = category.icon
      Expense.create({ name, date, categoryId, amount, userId }).then(() =>
        res.redirect("/")
      )
    })
    .catch((err) => console.log(err));
});


router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categories = await Category.find().lean()
    const expense = await Expense.findOne({ _id, userId }).lean()
    categories.map(category => {
      return category.isSelected = category._id.toString() === expense.categoryId.toString()
    })
    expense.date = expense.date.toLocaleDateString('zu-ZA')
    res.render('edit', { expense, categories })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const { name, date, category, amount } = req.body
    const matchCategory = await Category.findOne({ name: category })
    await Expense.findOneAndUpdate({ _id, userId },
      { name, date, categoryId: matchCategory.icon, amount })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    await Expense.findOneAndDelete({ _id, userId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;