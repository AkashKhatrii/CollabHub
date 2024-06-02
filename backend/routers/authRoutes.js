const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authMiddleware, getUser); // checking token
router.get('/test', (req, res) => {
    res.send('auth test')
})
module.exports = router;
