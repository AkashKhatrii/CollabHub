const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('req')
    const { name, email, password } = req.body;
    console.log(email);
  
    try{
      console.log("inside try", email)
      let user = await User.findOne({ email });
  
      if (user){
          res.status(400).json({msg: 'user with given email already exists '})
      }
  
      user = new User({ name, email, password });
  
      const salt = await bcrypt.genSalt(5);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();

      const profile = new UserProfile({ user: user._id });

      await profile.save();

  
      const payload = {
          user: {
              id: user.id,
          }
      }
  
      // get token after registering
      jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
          if (err) throw err;
          res.json({ token });
      })
    }catch(err){
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      // get token after logging in
      jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.get('/', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }); 


router.get('/test', (req, res) => {
    res.send('auth test')
})
module.exports = router;
