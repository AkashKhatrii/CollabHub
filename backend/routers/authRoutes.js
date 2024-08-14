const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User')
const Technology = require('../models/Technology');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const Project = require('../models/Project');
const router = express.Router();

const { database, ref, get, set, push } = require('../config/firebase'); 

router.post('/register', async (req, res) => {
    console.log('req')
    const { name, email, password, securityQuestion, securityAnswer } = req.body;
  
    try{
      let user = await User.findOne({ email });
  
      if (user){
          res.status(400).json({msg: 'user with given email already exists '})
      }
  
      user = new User({ name, email, password, securityQuestion, securityAnswer });
  
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
        const userId = user.id;
        res.json({ token, userId });
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
    const { github, skills, interests, bio } = req.body;
    try {
        const profile = await UserProfile.findOne({ user: req.user.id });

        if (!profile){
            profile = new UserProfile({
                user: req.user.id,
                profilePicture: ''
            })
        }

        profile.github = github;
        profile.bio = bio;
        profile.skills = skills;
        profile.interests = interests;
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

router.get('/profile/:userId', authMiddleware, async (req, res) => {
    const userId = req.params.userId;
    console.log('Inside route /profile/:userId', userId);
    try{
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({ msg: 'User not found '});
        }

        const projects = await Project.find({ user: userId });
        const technologies = await Technology.find({ user: userId });

        res.json({
            name: user.name,
            projects: projects,
            technologies: technologies
        });
    }catch(error){
        res.status(500).end('Server error');
    }
})
router.post('/addTechnologies', authMiddleware, async (req, res) => {
    const userId = req.user.id;
  const technologies = req.body.technologies;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedTechnologies = [];
    
    for (let tech of technologies) {
      const existingTech = await Technology.findOne({ user: userId, name: tech.name });

      if (existingTech) {
        existingTech.proficiency = tech.proficiency;
        await existingTech.save();
        updatedTechnologies.push(existingTech);
      } else {
        const newTech = new Technology({
          user: userId,
          name: tech.name,
          proficiency: tech.proficiency,
        });
        await newTech.save();
        updatedTechnologies.push(newTech);
      }
    }

    res.json(updatedTechnologies);
  } catch (err) {
    console.error('Error in /technologies route:', err.message);
    res.status(500).send('Server error');
  }
})

router.get('/technologies', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try{
        const technologies = await Technology.find({ user: userId });
        res.json({ technologies })
    }catch(error){
        console.error('Error fetching technologies:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/addProjects', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const projects = req.body.projects;

    try{

        if (!Array.isArray(projects) || projects.length === 0) {
            return res.status(400).json({ message: 'No projects provided' });
          }

        const projectsUser = projects.map(project => ({
            ...project,
            user: userId
        }));

        await Project.insertMany(projectsUser);
        res.status(201).json({message: 'projects saved successfully'});
    }catch(err){
        console.error('Error in /projects route:', err.message);
    res.status(500).json({ message: 'Server error' });
    }
})

router.get('/projects', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    try{
        const projects = await Project.find({ user: userId });
        console.log(projects)
        res.json({ projects });
    }catch(error){
        console.error('Error fetching projects:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/discover', authMiddleware, async (req, res) => {
    const { techName } = req.query;
    try{
        const technologies = await Technology.find({
            name: { $regex: new RegExp(`^${techName}$`, 'i') }
        }).populate('user', 'name email');
        const users = [];
        for (const tech of technologies) {
            let user = tech.user.toObject(); // Convert Mongoose document to plain object
            user.technologies = [];
            user.bio = ''
            users.push(user)
        }
        for (let user of users) {
            const userTechnologies = await Technology.find({ user: user._id });
            const profile = await UserProfile.findOne({ user: user._id});
            console.log(profile)
            user.bio = profile.bio ; // Check if bio exists
            user.technologies = userTechnologies.map(tech => tech.name);
        }
        res.status(200).json(users);

    }catch(error){
        res.status(500).json({ message: 'Error fetching users ', error});
    }
})

router.post('/start-chat', authMiddleware, async(req, res) => {

  console.log('Inside start chat');
  const senderId = req.user.id;
  const { recipientId } = req.body;

  console.log(senderId, recipientId);
  console.log(database);
  try{
    const chatRoomRef = ref(database, 'chatrooms');
    const chatRoomsSnapshot = await get(chatRoomRef);
    let existingChatRoomId = null;

    console.log('chatRoomRef', chatRoomRef);
    console.log('chatRoomsSnapshot', chatRoomsSnapshot);
    chatRoomsSnapshot.forEach(chatRoom => {
      const chatRoomData = chatRoom.val();
      const users = chatRoomData.users || [];

      if(users.includes(senderId) && users.includes(recipientId)){
        existingChatRoomId = chatRoom.key;
      }
    })

    console.log('existingChat', existingChatRoomId);

    if (existingChatRoomId){
      return res.status(200).json({ chatRoomId: existingChatRoomId });
    }

    
    let newChatRoomRef = push(chatRoomRef);
    await set(newChatRoomRef, {
      users: [senderId, recipientId],
      messages: [],
      createdAt: new Date().toISOString(),
    });
    
    res.status(200).json({ chatRoomId: newChatRoomRef.key });
  }catch(error){
    res.status(500).json({ error: error});
  }
})

router.post('/security-question', async (req, res) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send('User not found.');

      res.json({ securityQuestion: user.securityQuestion });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving security question.');
  }
});

router.post('/reset-password-via-security-question', async (req, res) => {
  try {
      const { email, securityAnswer, newPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send('User not found.');

      // const isAnswerValid = await bcrypt.compare(securityAnswer, user.securityAnswer);
      if (securityAnswer !== user.securityAnswer){
        return res.status(400).send('Incorrect security answer.');
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.send('Password reset successful.');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error resetting password.');
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
