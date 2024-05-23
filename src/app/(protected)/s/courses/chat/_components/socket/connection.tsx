import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../messages/message';

const useWebSocketConnection = (courseId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const newSocket = io('ws://localhost:3001');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            // Fetch messages for the specific course
            newSocket.emit('joinCourse', courseId);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        newSocket.on('server:loadmessages', (messages) => {
            console.log('Received messages from server:', messages);
            setMessages(messages);
        });

        newSocket.on('server:newMessage', (newMessage) => {
            console.log('Received new message from server:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        newSocket.on('server:messageDeleted', (deletedMessageId) => {
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg._id !== deletedMessageId)
            );
        });

        newSocket.on('server:messageUpdated', (updatedMessage) => {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === updatedMessage._id ? updatedMessage : msg
                )
            );
        });

        return () => {
            console.log('Closing WebSocket connection...');
            newSocket.disconnect();
        };
    }, [courseId]); // Add courseId as a dependency to re-establish connection when courseId changes

    return {
        socket,
        messages,
    };
};

export default useWebSocketConnection;
