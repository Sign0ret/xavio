import app from './app';
import { Server as webSocketServer } from 'socket.io';
import http from 'http';
import sockets from './sockets';
import { connectDB } from './db';

connectDB();

const server = http.createServer(app);

const io = new webSocketServer(server, {
  cors: {
    origin: 'http://localhost:3000', // URL that can access to the websocket
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = 3001;

sockets(io);

server.listen(PORT);

console.log(`Listening on port ${PORT}`);
