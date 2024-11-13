var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var db = require('../models');
var GuitarService = require('../services/GuitarService');
var guitarService = new GuitarService(db);

var jwt = require('jsonwebtoken');

//Check if authorized
const ensureAuth = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, message: "Error! Token was not provided." });
        return;
    }
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401).json({ success: false, message: err });
        return;
    }
    next();
}

/* GET all Guitars */
router.get('/', ensureAuth, async function (req, res, next) {
	const guitars = await guitarService.get();
	res.json(guitars).status(200);
});

/* GET specified Guitar */
router.get('/:guitarId', ensureAuth, async function (req, res, next) {
	const guitar = await guitarService.getGuitarDetails(req.params.guitarId);
	res.json(guitar).status(200);
});

/* POST new Guitar */
router.post('/', ensureAuth, jsonParser, async function (req, res, next) {
	let Year = req.body.year;
	let Price = req.body.price;
	let BrandId = req.body.brandId;
	let ModelId = req.body.modelId;
	let ColorId = req.body.colorId;
	console.log("Year: ", Year);
	console.log("Price: ", Price);
	const newGuitar = await guitarService.create(Year, Price, BrandId, ModelId, ColorId);
	res.status(200).json({ success: true, message: "Guitar added successfully.", newGuitar });
});

module.exports = router;

