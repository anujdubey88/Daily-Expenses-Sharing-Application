const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router.post('/', async (req, res) => {
  const { description, amount, splitMethod, participants } = req.body;
  try {
    const expense = new Expense({ description, amount, splitMethod, participants });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.userId': req.params.userId });
    res.json(expenses);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/download', (req, res) => {
  res.status(501).json({ message: 'Download balance sheet not implemented yet' });
});

module.exports = router;
