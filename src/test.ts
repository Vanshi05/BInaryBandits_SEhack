// src/services/firebase.chat.test.ts
import {
    emailSignUp,
    emailSignIn,
    createChatRoom,
    getUserChatRooms,
    sendMessage,
    getMessages,
    onChatRoomUpdate,
    onMessagesUpdate,
    auth
  } from './Backend/firebase';
  
  async function runChatTests() {
    try {
      // 1. Authentication Test
      console.log("=== Starting Auth Tests ===");
      const user = await emailSignUp("test@example.com", "password123");
      console.log("Signed up:", user.uid);
     
      const loggedInUser = await emailSignIn("test@example.com", "password123");
      console.log("Logged in:", loggedInUser.uid);
  
      // 2. Chat Room Test
      console.log("\n=== Starting Chat Room Tests ===");
      const otherUserId = "other_user_id_123"; // Replace with real ID
      const roomId = await createChatRoom([user.uid, otherUserId]);
      console.log("Created room:", roomId);
  
      const rooms = await getUserChatRooms(user.uid);
      console.log("User rooms:", rooms);
  
      // 3. Message Test
      console.log("\n=== Starting Message Tests ===");
      await sendMessage(roomId, user.uid, "Hello world!");
      const messages = await getMessages(roomId);
      console.log("Messages:", messages);
  
      // 4. Real-time Tests
      console.log("\n=== Starting Real-time Tests ===");
      const unsubscribeRooms = onChatRoomUpdate(user.uid, (rooms) => {
        console.log("Rooms updated:", rooms);
      });
  
      const unsubscribeMessages = onMessagesUpdate(roomId, (messages) => {
        console.log("New messages:", messages);
      });
  
      // Keep listeners active for 30 seconds
      setTimeout(() => {
        unsubscribeRooms();
        unsubscribeMessages();
        console.log("Unsubscribed listeners");
        auth.signOut();
      }, 30000);
  
    } catch (error) {
      console.error("Test failed:", error);
    }
  }
  
  // Run tests when file is executed directly
  if (require.main === module) {
    runChatTests();
  }
  
  // For importable test suite
  export { runChatTests };