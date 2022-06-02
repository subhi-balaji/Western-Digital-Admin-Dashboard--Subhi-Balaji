var jwt = require('jsonwebtoken');
const jwtSecret = "iAmPizza@veryTasty2#";

//Get the user from the jwt token and add id to req obj
const userData = (req, res, next) => {
    //Recieve token
    const token = req.header('token');
    //if no token, bad request 
    if (!token) {
        return res.status(401).send({ error: "Please use valid authentication token" })
    }
    //else, verify token and extract payload, append payload to req object, and call next (endpoint)
    try {
        const payload = jwt.verify(token, jwtSecret);
        //user in "req.user" is the request object name 
        //user in "payload.user" is the name of the object that was tokenized in /createuser and /login  
        req.user = payload.user;
        next();
    } catch (error) {
        // Error because of invalid token, send bad request
        return res.status(401).send({ error: "Please use valid authentication token" })
    }

}

module.exports = userData;