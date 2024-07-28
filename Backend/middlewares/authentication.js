const jwt = require('jsonwebtoken')
require('dotenv').config

const authenicateJwt = (req, res, next) => {
    const token = req.headers.autherization;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" })
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized" })
        }
        req.email = decode;
        next();
    });
}

module.exports = authenicateJwt;