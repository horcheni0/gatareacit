const router = require("express").Router();
const messageController = require('../controllers/messageController');

router.post("/:userId", messageController.addMessage);
router.get("/:userId", messageController.getMessages);
router.post('/:senderId', messageController.sendMessage);

module.exports = router;
