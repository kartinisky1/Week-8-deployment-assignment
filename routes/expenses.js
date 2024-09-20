const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Expense } = require('../models');

// GET /api/expenses
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/expenses
router.post('/', auth, async (req, res) => {
  const { description, amount } = req.body;
  try {
    const newExpense = await Expense.create({
      userId: req.user.id,
      description,
      amount
    });
    res.json(newExpense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT /api/expenses/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    const updatedExpense = await expense.update(req.body);
    res.json(updatedExpense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE /api/expenses/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    await expense.destroy();
    res.json({ msg: 'Expense deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/expenses/total
router.get('/total', auth, async (req, res) => {
  try {
    const total = await Expense.sum('amount', { where: { userId: req.user.id } });
    res.json({ total: parseFloat(total).toFixed(2) });  // Ensure total is a number formatted to two decimal places
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;