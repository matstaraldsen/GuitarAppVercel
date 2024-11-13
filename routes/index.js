var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);

// GET home page
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Guitar App' });
});

// POST signup new user
router.post("/signup", async (req, res, next) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    userService.create(userEmail, userPassword)
    let token;
    try {
        token = jwt.sign(
            { email: userEmail },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    res.status(201).json({
        success: true,
        data: {
            email: userEmail,
            token: token
        },
    });
});


// POST login existing user
router.post("/login", async (req, res, next) => {
	const userEmail = req.body.email;
    const userPassword = req.body.password;

    const existingUser = await userService.getOne(userEmail);

    if (!existingUser || existingUser.Password !== userPassword) {
        const error = new Error("Incorrect Credentials");
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { email: existingUser.email },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: {
            email: existingUser.Email,
            token: token
        },
    });
});

module.exports = router;
