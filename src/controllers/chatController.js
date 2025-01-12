export const handleSocketConnection = (socket, io) => {
    console.log("User connected:", socket.id);
  
    // Join a specific chat room
    socket.on('joinChatRoom', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat room ${chatId}`);
    });
  
    // Listen for a new message
    socket.on('sendMessage', (chatId, message) => {
        console.log(`Received message in chat ${chatId}:`, message); // Log received message
        io.to(chatId).emit('newMessage', message); // Broadcast message to the chat room
      });
      
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  };
  