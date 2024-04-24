// messagetoadminRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMsg,
  createMsg,
  deleteMsg
} = require('../controllers/messagetoadminController');

router.get('/', getMsg);
router.post('/', createMsg);
router.delete('/:id', deleteMsg);

module.exports = router;
