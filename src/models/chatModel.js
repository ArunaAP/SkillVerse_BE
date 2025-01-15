import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  sender: {
    type: String, // You can store userId or any other identifier
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
