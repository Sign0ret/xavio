import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../messages/message';
import { useInView } from 'react-intersection-observer';

const useWebSocketConnection = (courseId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState<number>(1);
    const { ref: topRef, inView, entry } = useInView({ threshold: [1.0] }); // Ensure threshold is appropriate
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    /* useEffect(() => {
        console.log('topRef in view:', inView);
        console.log('Intersection entry:', entry);
    }, [inView, entry]); */

    const scrollToBottom = () => {
        setTimeout(() => {
            scrollContainerRef.current?.scrollTo(0, scrollContainerRef.current.scrollHeight);
        }, 1);
    };

    useEffect(() => {
        const newSocket = io('ws://localhost:3001');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            newSocket.emit('joinCourse', courseId);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        newSocket.on('server:loadmessages', ({ messages: newMessages, page }) => {
            console.log('Received messages from server:', newMessages);
            setMessages((prevMessages) => [ ...newMessages, ...prevMessages]);
        });

        newSocket.on('server:newMessage', (newMessage) => {
            console.log('Received new message from server:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            scrollToBottom();
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
    }, [courseId]);

    useEffect(() => {
        if (inView) {
            const nextPage = page + 1;
            if (socket) {
                socket.emit('client:fetchMessages', { courseId, page: nextPage, limit: 10 });
                setPage(nextPage);
            }
        }
    }, [inView, socket, courseId]);

    return {
        socket,
        messages,
        topRef,
        scrollContainerRef,
    };
};

export default useWebSocketConnection;
