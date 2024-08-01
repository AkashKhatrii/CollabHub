const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
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


router.post('/completeProfile', authMiddleware, async (req, res) => {
    const { github, skills, interests } = req.body;
    console.log('completeProfile', github)
    try {
        const profile = await UserProfile.findOne({ user: req.user.id });

        if (!profile){
            profile = new UserProfile({
                user: req.user.id,
                profilePicture: ''
            })
        }

        profile.github = github;
        profile.skills = skills;
        profile.interests = interests;
        console.log(profile);
        await profile.save();
        res.json({ message: 'Profile updated successfully', profile });
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// router.get('/profile', authMiddleware, async(req, res) => {
//     console.log('Hiiiiiiiiiiiii')
//     try{
//         const userId = req.user.id;
//         console.log('/profile', userId);
//         const profile = await UserProfile.findOne({ user: req.user.id });
//         if (!profile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }
//         res.json(profile);
//     } catch (err) {
//         console.log('profileeee');
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// })

router.get('/profile', authMiddleware, async (req, res) => {
    console.log('Fetching profile for user ID:', req.user.id);

    try {
        // Extract user ID from request object
        const userId = req.user.id;
        const profile = await UserProfile.findOne({ user: userId });

        if (!profile) {
            console.log('Profile not found for user ID:', userId);
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Send profile data as response
        res.json(profile);
    } catch (err) {
        console.error('Error in /profile route:', err.message);
        res.status(500).send('Server error');
    }
});


router.get('/test', (req, res) => {
    res.send('auth test')
})

router.get('/:userId', authMiddleware, async(req, res) => {
    try{
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details
        res.json(user);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  })
module.exports = router;
