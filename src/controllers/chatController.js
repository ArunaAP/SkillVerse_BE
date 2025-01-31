import Message from "../models/chatModel.js";

export const handleSocketConnection = (socket, io) => {
  console.log("User connected:", socket.id);

  // Join a specific chat room
  socket.on("joinChatRoom", async ({ clientId, designerId }) => {
    const chatId = `${clientId}-${designerId}`;
    socket.join(chatId);
    console.log(`User joined chat room ${chatId}`);
    console.log(`cleintId: ${clientId} designerId: ${designerId}`);

    // Fetch previous messages
    try {
      const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
      socket.emit("previousMessages", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  // Listen for a new message
  socket.on("sendMessage", async (chatId, message) => {
    try {
      const newMessage = new Message({
        chatId,
        sender: message.sender,
        text: message.text,
        timestamp: new Date(),
      });
      await newMessage.save();
      console.log(newMessage);

      // Broadcast message to the room
      io.to(chatId).emit("newMessage", newMessage);

      // Notify the designer
      const [_, designerId] = chatId.split("-");
      io.to(designerId).emit("newNotification", {
        message: `New message from ${message.sender}`,
        chatId,
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
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

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Failed to fetch chats." });
  }
};
