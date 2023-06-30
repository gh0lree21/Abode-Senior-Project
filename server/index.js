const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messagesRoute = require('./routes/messagesRoute');

const socket = require('socket.io');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successful")
}).catch((error) => {
    console.log(error.message);
});



const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`)
});

// Create the socket
const io = socket(server, {
    cors: {
        // adjust the origin as needed
        origin: "http://localhost:3000",
        credentials: true
    }
});

// create a variable to hold a map of the users that are online
global.onlineUsers = new Map();

// when someone connects or sends a message...
io.on('connection', (socket) => {
    global.chatSocket = socket;

    // ... store the user's id and the socket id
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    // ... 
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.message);
        }
    });
});