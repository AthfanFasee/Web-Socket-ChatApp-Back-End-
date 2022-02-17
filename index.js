const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);



const io = new Server(server, {
    cors: {
        origin: 'https://web-socket-chat-app-front-end.vercel.app/',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    
    socket.on('joinRoom', (roomID) => {
        socket.join(roomID);
        console.log(`Useer with ID: ${socket.id} joined room: ${roomID}`);
    });

    socket.on('sendMessage', (data) => {
        socket.to(data.room).emit('receiveMessage', data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    })
})







server.listen(process.env.PORT || "0.0.0.0", () => {
    console.log('Server listening');
})