const express = require('express'); //Imports the "express" library
const router = express.Router(); 
const { openaiController } = require('../controllers/openaiController'); //imports the openaiController from openaiController.js

router.post('/generate', openaiController); //sets up a POST route at /generate that uses the controller

module.exports = router; //export the router to the app.js file
