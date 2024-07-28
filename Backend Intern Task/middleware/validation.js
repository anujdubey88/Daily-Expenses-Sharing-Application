const User = require('../models/user');

const userValidationMiddleware = async (req, res, next) => {
  const { participants } = req.body;
  
  try {
    for (const participant of participants) {
      let user = await User.findOne({ email: participant.email });
      if (!user) {
        user = new User({ email: participant.email, name: participant.name, mobile: participant.mobile });
        await user.save();
      }
      participant.userId = user._id;
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = userValidationMiddleware;
