// msgController.js
const Messages = require("../models/msgModel");

exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      const senderName = msg.sender.toString() === from ? "You" : "OtherUser";
      return { sender: senderName, fromSelf: msg.sender.toString() === from, message: msg.message.text };
    });
    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};

exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({ message: { text: message }, users: [from, to], sender: from });
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    next(error);
  }
};
