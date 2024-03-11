'use strict';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    console.log(req.path)
    
    const bearToken = req.header('Authorization');
    console.log(bearToken)

    if (!bearToken) {
        console.log('Unauthorized: No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const token = bearToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Forbidden: Invalid token');
        return res.status(403).json({ message: 'Forbidden' });
    }
};
module.exports = {
    authMiddleware
}


