const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var verifyUser = require('../middleware/verifyUser');

const jwtSecret = "iAmPizza@veryTasty2#";

const emailList = ["stephen.wallace@wdc.com",
    "yan.li@wdc.com",
    "mike.langberg@wdc.com",
    "sbalaji2@ucmerced.edu",
    "mnor5@ucmerced.edu",
    "sfigueroa12@ucmerced.edu",
    "psingh56@ucmerced.edu"
]


//Route 1: create a user using: POST "/api/auth/createuser"    
router.post('/createuser',
    [   //add all validations in an array  (copied from express validations)
        body('name', 'Name must be atleast 2 characters').isLength({ min: 2 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    ],
    async (req, res) => {
        let success = false;
        // Finds validation errors in the request and wraps them in an object, and return bad request
        // (copied from express validations)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, Error: errors.array() });
        }
        //try-catch is used incase of any errors
        try {
            // Check if this email exist in the database already or no (Ensure unique email)
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(409).json({ success, Error: "This email is already registered" })
            }

            //Check if this email is in the valid email list array
            const validEmail = emailList.find(element => element == req.body.email)
            console.log(validEmail)
            if (validEmail) {
                //secure the password
                const salt = await bcrypt.genSalt(10);        // 10 is saltRounds
                const passHash = await bcrypt.hash(req.body.password, salt);

                // Else: create user. ONE WAY TO SAVE DATA TO DB (COPPIED FROM EXPRESS VALIDATOR)
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: passHash,
                })
                success = true;
                res.json({ success })
            }
            else { return res.status(409).json({ success, Error: "Invalid email" }) }

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");   //For server errors
        }
    }
)


/////////////////////////////////////////////////////////////////////////////////////////////


//Route 2: login endpoint using: POST "/api/auth/login"     
router.post('/login',
    [
        body('email', 'Please enter a valid email').isEmail(),
        body('password', 'Please enter your password').not().isEmpty(),    //password cannot be blank
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, Error: errors.array() });
        }

        //get email and password from request
        const { email, password } = req.body;
        try {
            // check if this email exists in the db
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ success, Error: "Please enter correct login credentials" })
            }

            // compare the request password with the ones in db
            const passwordCompare = await bcrypt.compare(password, user.password)
            // if password dont match, bad request 
            if (!passwordCompare) {
                return res.status(401).json({ success, Error: "Please enter correct login credentials" })
            }

            // else create and return token as response 
            const data = { user: { id: user.id } }
            const token = jwt.sign(data, jwtSecret);
            success = true;
            res.json({ success, token })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");   //For server errors
        }
    }
)


/////////////////////////////////////////////////////////////////////////////////////////////


//Route 3: verify logedin user token    post reqest            login required
router.post('/verifyToken', verifyUser, async (req, res) => {
    // extract user id from token with middleware function
    try {
        const userID = req.user.id;  //id is the property of obj payload.user
        const user = await User.findById(userID);
        if (!user) {
            return res.status(401).send("Unauthorized")
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   //For unknown errors
    }
}
)


module.exports = router;