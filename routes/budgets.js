const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Budget } = require('../models');

// GET all budgets
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.findAll({ where: { userId: req.user.id } });
    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new budget
router.post('/', auth, async (req, res) => {
  const { amount, startDate, endDate, categoryId } = req.body;
  try {
    const newBudget = await Budget.create({
      amount,
      start_date: startDate,
      end_date: endDate,
      userId: req.user.id,  // Associating budget with the user
      categoryId: 1 // Associating budget with a category
    });
    res.json(newBudget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
