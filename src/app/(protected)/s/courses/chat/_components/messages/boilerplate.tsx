import React, { useState } from 'react';
import { Message } from './message';
import useChatSocket from '../socket/functions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from '@/hooks/use-current-user';

type Props = {
  message: {
    _id: string;
    sender: string;
    message: string;
    block: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  },

  params: {
    course: string;
  },
  onReply: (message: Message) => void;
  socket: any;
  name: string;
};

export function Boilerplate_message({ message, params, onReply, socket, name}: Props) {
  const user = useCurrentUser();
  const {
    deleteMessage,
    selectMessage,
    updatedMessage,
    updateMessage,
    setSelectedMessageId,
    setUpdatedMessage
  } = useChatSocket(socket);
  
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleReply = () => {
    // Call the function passed from the parent and pass a string value
    onReply(message);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isCurrentUser = user?.id ? message.sender === user.id : false;

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedMessage(message.message)
    selectMessage(message._id);
  };

  const handleUpdate = () => {
    if (message.message != updatedMessage) {
      updateMessage();
      setIsEditing(false);
    }else{
      setIsEditing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.message);
    setShowCopiedMessage(true);
    setTimeout(() => {
      setShowCopiedMessage(false);
    }, 600);
  };

  return (
    <div className={`relative z-50 flex items-start gap-2.5 ${isCurrentUser ? 'justify-end' : ''} py-2`}>
      {isCurrentUser ? null : (
        <img className="w-8 h-8 rounded-full" src="/xavio.svg" alt="Jese image" />
      )}
      {isCurrentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button id="dropdownMenuIconButton" onClick={toggleDropdown} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-white bg-zinc-600 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
              <svg className="w-4 h-4 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>opciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleReply}>Contestar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy}>Copiar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteMessage(message._id)}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className={`flex flex-col w-full max-w-[320px] lg:max-w-[500px] leading-1.5 p-4 border-gray-200 bg-zinc-600 ${isCurrentUser ? 'rounded-s-xl rounded-se-xl' : 'rounded-e-xl rounded-es-xl'} dark:bg-gray-700`} style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
  <div className="flex items-center space-x-2 rtl:space-x-reverse">
    <span className="text-sm font-semibold text-white dark:text-white">{name}</span>
  </div>
  {isEditing ? (
    <input
      type="text"
      value={updatedMessage}
      onChange={(e) => setUpdatedMessage(e.target.value)}
      onBlur={handleUpdate}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleUpdate();
      }}
      className="text-sm font-normal py-2.5 text-white bg-transparent outline-none"
    />
  ) : (
    <p className="text-sm font-normal py-2.5 text-white">{message.message}</p>
  )}
  <span className="text-sm font-normal text-gray-300">Delivered
    {message.updatedAt !== message.createdAt ? " (Edited)" : ""}
  </span>
</div>

      {!isCurrentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button id="dropdownMenuIconButton" onClick={toggleDropdown} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-white bg-zinc-600 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>opciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleReply}>Contestar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy} >Copiar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit} >Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteMessage(message._id)}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {showCopiedMessage && (
        <span className="text-white bg-zinc-600 py-1 px-2 rounded-md">Copied</span>
      )}
    </div>
  );
};
