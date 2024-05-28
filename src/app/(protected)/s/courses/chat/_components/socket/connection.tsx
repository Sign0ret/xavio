import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../messages/message';
import { useInView } from 'react-intersection-observer';

const useWebSocketConnection = (courseId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState<number>(1);
    const { ref: topRef, inView } = useInView({ threshold: [1.0] });
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: scrollContainer.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
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
            const scrollContainer = scrollContainerRef.current;
            let previousScrollHeight = 0;
            let previousScrollTop = 0;
            if (scrollContainer) {
                previousScrollHeight = scrollContainer.scrollHeight;
                previousScrollTop = scrollContainer.scrollTop;
            }

            setMessages((prevMessages) => [ ...newMessages, ...prevMessages]); 

            setTimeout(() => {
                if (scrollContainer) {
                    const newScrollHeight = scrollContainer.scrollHeight;
                    const heightDifference = newScrollHeight - previousScrollHeight;
                    scrollContainer.scrollTop = previousScrollTop + (heightDifference-100);
                }
            }, 10); 
        });

        newSocket.on('server:newMessage', (newMessage) => {
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
