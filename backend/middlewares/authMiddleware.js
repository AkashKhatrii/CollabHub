const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token!' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Log for debugging purposes
        console.log('Token verified, user:', req.user);

        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
