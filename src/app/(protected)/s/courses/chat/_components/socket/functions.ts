import { useState } from 'react';
import { Socket } from "socket.io-client";
import { Message } from "../messages/message";
import { useCurrentUser } from '@/hooks/use-current-user';
const useChatSocket = (socket: Socket | null) => {
    const user = useCurrentUser();
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [updatedMessage, setUpdatedMessage] = useState<string>("");
    //console.log(socket)
    const sendMessage = () => {
        if (socket) {
            const newMessage: Message = {
                _id: "",
                sender: user ? user.id : "" ,
                message: message,
                block: 1,
                createdAt: "",
                updatedAt: "",
                __v: 0
            };
            socket.emit("client:saveMessage", newMessage);
            setMessage("");
        }
    };
  
    const selectMessage = (messageId: string) => {
        setSelectedMessageId(messageId);
    };
    const updateMessage = () => {
        if (socket && selectedMessageId) {
            socket.emit("client:updateMessage", { messageId: selectedMessageId, message: updatedMessage });
            setUpdatedMessage("");
            setSelectedMessageId(null);
        }
    };

    const deleteMessage = (messageId: string) => {
        if (socket) {
            console.log("id:", messageId);
            socket.emit("client:deleteMessage", messageId);
        }
    };
    return {
        message,
        setMessage,
        messages,
        selectedMessageId,
        updatedMessage,
        sendMessage,
        selectMessage,
        updateMessage,
        deleteMessage,
        setSelectedMessageId,
        setUpdatedMessage
    };
};
export default useChatSocket;