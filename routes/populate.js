var express = require('express');
var router = express.Router();
var db = require('../models');
var PopulateService = require('../services/PopulationService');
var populateService = new PopulateService(db)

//Populate DB
router.post('/', async function (req, res, next) {
    await populateService.populateDatabase();
    res.status(200).json({ success: true, message: "Database populated successfully." });
    res.end();
})

module.exports = router;