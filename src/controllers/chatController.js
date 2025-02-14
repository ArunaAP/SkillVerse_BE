import Message from "../models/chatModel.js";

const activeUsers = new Map();

export const handleSocketConnection = (socket, io) => {
  console.log("User connected:", socket.id);

  socket.on("joinChatRoom", async ({ chatId }) => {
    socket.join(chatId);
    console.log(`User joined chat room ${chatId}`);

    activeUsers.set(socket.id, { chatId });

    try {
      const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
      socket.emit("previousMessages", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  socket.on("sendMessage", async (message) => {
    try {
      // Save the message to the database
      const newMessage = new Message({
        chatId: message.chatId, // ✅ Use 'message' from Socket.IO event
        text: message.text, // ✅ Use 'message' object from frontend
        sender: message.sender, // ✅ Ensure sender ID is passed correctly
        timestamp: message.timestamp, // ✅ Use provided timestamp
      });

      await newMessage.save();

      // Emit the message to all clients in the chat room
      io.to(message.chatId).emit("newMessage", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    activeUsers.delete(socket.id);
  });
};

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find unique chat rooms involving the user
    const chats = await Message.aggregate([
      { $match: { chatId: { $regex: userId } } },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$chatId",
          lastMessage: { $first: "$$ROOT" },
        },
      },
    ]);

    // Extract chat IDs
    const chatIds = chats.map((chat) => chat._id);

    res.status(200).json({ chats, chatIds }); // ✅ Send chatIds along with chat data
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Failed to fetch chats." });
  }
};

export const checkExistingChat = async (req, res) => {
  try {
    const { clientId, designerId } = req.params;

    // Generate chatId in the same format as it was stored
    const chatId1 = `${clientId}-${designerId}`;
    const chatId2 = `${designerId}-${clientId}`; // If order isn't fixed

    // Check if a chat exists between the client and designer
    const existingChat = await Message.findOne({
      chatId: { $in: [chatId1, chatId2] }, // Check both possible orders
    });

    if (existingChat) {
      return res.status(200).json({ chatExists: true, existingChat });
    }

    res.status(200).json({ chatExists: false });
  } catch (error) {
    console.error("Error checking existing chat:", error);
    res.status(500).json({ message: "Failed to check chat existence." });
  }
};
