const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization')

    if (!authHeader){
        res.status(401).json({msg: 'No token!'});
    }

    const token = authHeader.split(' ')[1];
    
    if (!token){
        res.status(401).json({msg: 'No token!'});
    }

    try{
        console.log(token, process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
        next();
    }
    catch(err){
        res.status(401).json({msg: 'Token is not valid'})
    }
};  

module.exports = authMiddleware;
