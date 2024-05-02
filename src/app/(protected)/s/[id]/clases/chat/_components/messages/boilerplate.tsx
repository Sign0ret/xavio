'use client'

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Message = {
  remitente: string,
  tiempo: string,
  mensaje: string,
  bloque: number | null,
}

type Props = {
  mensaje: {
    remitente: string;
    tiempo: string;
    mensaje: string;
    bloque: number | null;
  },
  params: {
    id: string;
    clase: string;
  },
  onReply: (message: Message) => void;
};

export function Boilerplate_mensaje({ mensaje, params, onReply }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleReply = () => {
    // Call the function passed from the parent and pass a string value
    onReply(mensaje);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isCurrentUser = mensaje.remitente === params.id;

  return (
    <div className={`relative z-50 flex items-start gap-2.5 ${isCurrentUser ? 'justify-end' : ''} py-2`}>
      {isCurrentUser ? null : (
        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
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
            <DropdownMenuItem>Copiar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className={`flex flex-col w-full max-w-[320px] lg:max-w-[500px] leading-1.5 p-4 border-gray-200 bg-zinc-600 ${isCurrentUser ? 'rounded-s-xl rounded-se-xl' : 'rounded-e-xl rounded-es-xl'} dark:bg-gray-700`}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-white dark:text-white">{mensaje.remitente}</span>
          <span className="text-sm font-normal text-gray-300">{mensaje.tiempo}</span>
        </div>
        {/* {mensaje && (() => {
          switch (mensaje.bloque) {
            case 1:
              return <Notadevoz_mensaje />;
            case 2:
              return <Documento_mensaje />;
            case 3:
              return <Media_mensaje />;
            case 4:
              return <Galeria_mensaje />;
            case 5:
              return <Link_mensaje />;
            case 6:
              return <Tarea_mensaje />;
            case 7:
              return <Producto_mensaje />;
            case 8:
              return <Pago_mensaje />;
            default:
              return null;
          }
        })()} */}
        <p className="text-sm font-normal py-2.5 text-white">{mensaje.mensaje}</p>
        <span className="text-sm font-normal text-gray-300">Delivered</span>
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
            <DropdownMenuItem  onClick={handleReply}>Contestar</DropdownMenuItem>
            <DropdownMenuItem>Copiar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
