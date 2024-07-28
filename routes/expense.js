const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const userValidationMiddleware = require('../middleware/userValidation');

router.post('/', userValidationMiddleware, async (req, res) => {
  const { description, amount, splitMethod, participants } = req.body;
  
  try {
    let totalAmount = 0;
    if (splitMethod === 'equal') {
      const splitAmount = amount / participants.length;
      participants.forEach(participant => {
        participant.amount = splitAmount;
      });
    } 
    else if (splitMethod === 'exact') {
      totalAmount = participants.reduce((sum, participant) => sum + participant.amount, 0);
      if (totalAmount !== amount) {
        return res.status(400).json({ message: 'Total amount does not match with the sum of exact amounts.' });
      }
    } 
    else if (splitMethod === 'percentage') {
      totalAmount = participants.reduce((sum, participant) => sum + participant.amount, 0);
      participants.forEach(participant => {
        participant.amount = (participant.percentage / 100) * amount;
      });
    } 
    else {
      return res.status(400).json({ message: 'Invalid split method.' });
    }

    const expense = new Expense({ description, amount, splitMethod, participants });
    await expense.save();
    res.status(201).json(expense);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
