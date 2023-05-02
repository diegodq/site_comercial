const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/', homeController.home);
router.post('/contact-us', homeController.sendEmail);

module.exports = router;