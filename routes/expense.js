const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const userValidationMiddleware = require('../middleware/userValidation');
const { Parser } = require('json2csv');

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

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const expenses = await Expense.find({ 'participants.userId': userId });
    res.json(expenses);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/overall', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/download', async (req, res) => {
  try {
    const expenses = await Expense.find().populate('participants.userId', 'email name mobile');
    
    const fields = ['description', 'amount', 'splitMethod', 'participants.email', 'participants.name', 'participants.mobile', 'participants.amount'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(expenses);

    res.header('Content-Type', 'text/csv');
    res.attachment('balance_sheet.csv');
    res.send(csv);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
