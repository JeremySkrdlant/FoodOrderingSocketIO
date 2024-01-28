import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // This will allow requests from any origin. Adjust as necessary for your use case.
        methods: ["GET", "POST"]
    }
});

// Enable CORS for all routes
app.use(cors());

// Define a route
app.get('/', (req, res) => {
    res.send('<h1>Socket Demo</h1><h2>Listens to</h2><ul><li>echo - string argument</li><li>order - phone number and itemAmount</li></ul><h2>Emits</h2><ul><li>returnEcho</li><li>OrderRecieved</li><li>OrderBeingProcessed</li><li>OrderDone</li></ul>');
});

// Handle a socket connection request from a web client
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("echo", (arg1)=>{
        console.log(`We recieved the message ${arg1}`);
        setTimeout(()=>{
            socket.emit("returnEcho", arg1);
        }, 10000)
    })

    socket.on("order", (phone, itemCount)=>{
        let time = itemCount * 10000; 
        setTimeout(()=>{
            socket.broadcast.emit("OrderRecieved", phone);
            socket.emit("OrderRecieved", phone);
            setTimeout(()=>{
                socket.broadcast.emit("OrderBeingProcessed", phone); 
                socket.emit("OrderBeingProcessed", phone); 
                setTimeout(()=>{
                    socket.broadcast.emit("OrderDone", phone);
                    socket.emit("OrderDone", phone);
                }, time)
            }, time)

        }, 2000)
    })
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});