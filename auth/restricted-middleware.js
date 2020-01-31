const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if (error) {
                // the token is not valid
                res.status(401).json({
                    message: `Token not valid.`
                })
            } else {
                req.user = {username: decodedToken.username}
                next();
            }
        })
    } else {
        res.status(400).json({
            message: `Nope.`
        })
    }
}