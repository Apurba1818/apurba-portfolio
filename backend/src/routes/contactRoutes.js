const express = require('express');
const router = express.Router();

// Import the function using destructuring
const { handleContactForm } = require('../controllers/contactController');

/**
 * Define the POST route. 
 * We pass the function reference 'handleContactForm'.
 * DO NOT call it here like handleContactForm()
 */
router.post('/', handleContactForm);

module.exports = router;