const express = require('express');
const bcrypt = require('bcryptjs');
const { body, check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const { readDataFromFile, writeDataToFile } = require('../handlers/dataHandler');
// const home = require('../views/register.ejs')


const router = express.Router();
const SECRET_KEY = '';

// render register page
router.get('/register', (req,res)=>{
    res.render('register',{errors : ""})
});

// implement register route
router.post('/register',[
body('email').isEmail().normalizeEmail().withMessage('unvalid Email  !'),
// body('psw').trim().isLength({ min : 6}).withMessage('try another password - should At least contain 8 characters')
check('password', 'Password is required and should be at least 6 characters.').exists().isLength({ min: 6 }),
body('Repeat-password').custom((value, { req }) => {
    if (value !== req.body.Repeat_password) {
    throw new Error('Repeat password does not match password.');
    }
    return true;
})
],async (req,res)=>{
    const users = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        return res.status(400).render('register', { errors: errors.array() });
    }else {
    const sanitizedEmail = xss(req.body.email);
    const saltRounds = 10;
    //Hashing Password using the bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//  NewUser
    const newUser = {
    email: sanitizedEmail,
    password: hashedPassword
    }
    console.log(users);
    console.log(newUser);
    users.push(newUser);
    writeDataToFile("../data/users.json", newUser)
    return res.status(201).json({ newUser, message: 'Registration successful!' });

}
});

// render login page
router.get('/login',(req,res)=>{
    res.render('login')
} );

// implement login route
router.post('/login', );

// implement logout route
router.get('/logout',);

module.exports = router;
