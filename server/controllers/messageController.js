const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { otherUserId } = req.query;

    const messages = await Messages.find({
      $or: [
        { users: [userId, otherUserId] },
        { users: [otherUserId, userId] }
      ]
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === userId,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
module.exports.sendMessage = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { receiverId, message } = req.body;

    const data = await Messages.create({
      senderId: userId,
      receiverId,
      message,
    });

    if (data) {
      return res.json({ msg: "Message sent successfully." });
    } else {
      return res.json({ msg: "Failed to send message." });
    }
  } catch (ex) {
    next(ex);
  }
};


/*module.exports.addMessage = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { otherUserId, message } = req.body;

    const data = await Messages.create({
      message: { text: message },
      users: [userId, otherUserId],
      sender: userId,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
*/