import MessageModel from "../models/MessageModel.js";
import cloudinary from "../utils/cloudinary.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, text, textImg, url } = req.body;
  try {
    if (textImg) {
      const uploadRes = await cloudinary.uploader.upload(textImg, {
        upload_preset: "hotles_message",
      });
      if (uploadRes) {
        const message = new MessageModel({
          chatId: chatId,
          senderId: senderId,
          text: text,
          url: url,
          textImg: uploadRes,
        });
        const newmessage = await message.save();
        res.status(201).json(newmessage);
      }
    } else if (!textImg) {
      const message = new MessageModel({
        chatId: chatId,
        senderId: senderId,
        text: text,
        url: url,
      });
      const newmessage = await message.save();
      res.status(201).json(newmessage);
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const message = await MessageModel.find({ chatId });
    res.status(200).json(message);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUnreadMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await MessageModel.find({ chatId });
    const unread = messages.filter((msg) => !msg.seen);
    res.status(200).json(unread);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const ReadMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await MessageModel.find({ chatId });
    const unread = messages.filter((msg) => !msg.seen);

    // Update all unread messages to set 'seen' to true
    if (unread.length > 0) {
      await MessageModel.updateMany(
        { _id: { $in: unread.map((msg) => msg._id) } },
        { $set: { seen: true } }
      );
    }

    res.status(200).json("Messages marked as seen");
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const GetAllUnread = async (req, res) => {
  try {
    const { currentUserId } = req.body;
    const messages = await MessageModel.find({
      senderId: currentUserId,
      seen: false,
    });
    console.log("sender:", currentUserId);
    res.status(200).json(messages);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
