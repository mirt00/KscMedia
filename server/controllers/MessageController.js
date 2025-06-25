import MessageModel from "../models/messageModel.js";

export const addMessage  = async (req, res) => {
  const { chatId, senderId, encryptedText } = req.body;

  try {
    const decryptedText = decrypt(encryptedText); // Manual RSA decryption

    const message = new MessageModel({
      chatId,
      senderId,
      encryptedText,
      decryptedText, // Optional – useful for debugging only
    });

    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get all messages of a chat
export const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error.message);
  }
};