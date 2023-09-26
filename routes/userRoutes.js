const express = require('express');
const bcrypt = require('bcryptjs');
const { body, check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const { readDataFromFile, writeDataToFile } = require('../handlers/dataHandler');
// const home = require('../views/register.ejs')
const usersFile ="../data/users.json";
const users = readDataFromFile(usersFile);
const router = express.Router();

// middleware dor cookie parser
app.use(cookieParser());

const SECRET_KEY = '';
app.use(express.static('public'));


// render register page
router.get('/register', (req,res)=>{
    res.render('register',{errors : ""})
});

// implement register route
router.post('/register',[
body('email').isEmail().normalizeEmail().withMessage(' not a valid  Email  !'),
// body('psw').trim().isLength({ min : 6}).withMessage('try another password - should At least contain 8 characters')
check('password', 'Password is required and should be at least 6 characters.').exists().isLength({ min: 6 }),
body('Repeat-password').custom((value, { req }) => {
    if (value !== req.body.Repeat_password) {
    throw new Error('Repeat password does not match password.');
    }
    return true;
})
],async (req,res)=>{
    // const users = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        return res.status(400).render('register', { errors: errors.array() });
    }else {
    const sanitizedEmail = xss(req.body.email);
    const saltRounds = 10;
    //Hashing Password using the bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = {
    email: sanitizedEmail,
    password: hashedPassword
    }
    // users.add(newUser)
    // writeDataToFile()
    writeDataToFile(usersFile, newUser)
    res.render('login')
    return res.status(201).json({ newUser, message: 'Registration successful!' });
}
});

// render login page
router.get('/login', (req, res) => {

    res.render('login')
});


// implement login route
router.post('/login', (req,res)=>{

    console.log(users);
    const user = {
        email : req.body.email,
        password: req.body.password
    }
    const emailCheck = users.find((elem)=>elem.email === user.email )
    const pwdCheck = bcrypt.compare(password , user.password)
    if(!emailCheck || !pwdCheck){
        return res.status(401).render('login',{ message: "The username and password your provided are invalid" });
    }
    const token = jwt.sign({ user }, SECRET_KEY);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged in successfully 😊 👌" })
      .render('services-dashboard');
  })
    // return res.status(201).} );


// implement logout route
router.get('/logout',);

module.exports = router;
