// src/socket.js
import { io } from "socket.io-client";

// Adjust the URL to match your server's address and port
const apiUrl = import.meta.env.VITE_API_URL;

// Initialize the Socket.IO client
export const socket = io(apiUrl, {
  autoConnect: false, // Prevents automatic connection
});
