import app from './app';
import { Server as webSocketServer } from 'socket.io';
import http from 'http';
import sockets from './sockets';
import {config} from 'dotenv';
import { connectDB } from './db';
config();
connectDB();

const server = http.createServer(app);

const io = new webSocketServer(server, {
  cors: {
    origin: process.env.PORT,
    methods: ["GET", "POST"],
    credentials: true
  }
});

sockets(io);

const httpServer = server.listen(3001);

console.log('Listening on port 3001');
