const express = require("express")
const router = express.Router();
const User = require('../models/user')

router.post('/', async (req, res) => {
    const {email, name, mobileNumber} = req.body;
    try{
        const user = new User({email, name, mobileNumber})
        await user.save()
        res.status(201).json({message: 'User created successfully'})
    } 
    catch(err){
        res.status(500).json({message: 'Error creating user', error: err})
    }
    
})

router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } 
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;