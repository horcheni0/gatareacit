const express = require('express');
const router = express.Router();
const totalController = require('../controllers/totalController');
router.get('/', totalController.getTotals);
router.get('/generate',totalController.generateData);
router.post('/', totalController.createTotal);
router.get('/gender', totalController.getTotalGender);
router.get('/percentage', totalController.getTotalGenderPercentage);
router.get('/hour', totalController.getTotalsHour);
router.get('/emotion', totalController.getEmotions);
router.get('/leatest', totalController.getLatestTotal);


module.exports = router;
