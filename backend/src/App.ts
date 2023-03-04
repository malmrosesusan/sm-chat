import 'reflect-metadata';
import { ChatMessage, User, SocketEvent } from '../../shared/typing/Typing';
import { ChatService } from './services/ChatService';

const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(8000, async () => {
    console.log(`Server is up and running on 8000 ...`);
});

const { Server } = require("socket.io");
const io = new Server(server, { path: '/socket.io', cors: { origin: 'http://localhost:4200', methods: ["GET", "POST"] } });

const chatService: ChatService = new ChatService();

io.on(SocketEvent.CONNECTION, (socket: any) => {

    // Message received
    socket.on(SocketEvent.MSG, function (msg: ChatMessage) {
        msg.user.isTyping = false;
        io.emit(SocketEvent.USER_STOPPED_TYPING, { user: msg.user });
        io.emit(SocketEvent.MSG, { msg: msg });
        const botMessage = chatService.handleMessage(msg);
        if (botMessage) {
            io.emit(SocketEvent.MSG, { msg: botMessage });
        }
    })

    // user joined chat
    socket.on(SocketEvent.JOIN_CHAT, function (user: User) {
        const welcomeMessage: ChatMessage = {
            message: `Welcome to the chat, ${user.name}.`,
            createdAt: new Date(),
            user: {
                name: 'bot',
                isOnline: true,
                isTyping: false,
            }
        }
        io.emit(SocketEvent.MSG, { msg: welcomeMessage });
    })

    // user left chat
    socket.on(SocketEvent.LEAVE_CHAT, function (user: User) {
        const leavingMessage: ChatMessage = {
            message: `${user.name} has left the chat.`,
            createdAt: new Date(),
            user: {
                name: user.name,
                isOnline: false,
                isTyping: false,
            }
        }
        io.emit(SocketEvent.MSG, { msg: leavingMessage });
    })

    // user is typing
    socket.on(SocketEvent.USER_TYPING, function (user: User) {
        user.isTyping = true;
        io.emit(SocketEvent.USER_TYPING, { user: user });
    })

    // user stopped typing
    socket.on(SocketEvent.USER_STOPPED_TYPING, function (user: User) {
        user.isTyping = false;
        io.emit(SocketEvent.USER_STOPPED_TYPING, { user: user });
    })

});




