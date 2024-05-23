"use client";
import React from 'react';
import { 
    ChevronsUpDownIcon, 
    PencilIcon,
    BookOpenIcon
} from '@/components/icons';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { 
    AvatarImage, 
    AvatarFallback, 
    Avatar 
} from "@/components/ui/avatar"
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type Props = {
  params: { 
    course: string
 }
};


const studentsInfo = [
    {
      nombre: "adolfo",
      id: "12345",
    },
    {
      nombre: "Bryan",
      id: "12345",
    },
    {
      nombre: "Jorge",
      id: "12345",
    },
    {
      nombre: "Carlos",
      id: "12345",
    },
    {
      nombre: "Arturo",
      id: "12345",
    },
    {
        nombre: "adolfo",
        id: "12345",
      },
      {
        nombre: "Bryan",
        id: "12345",
      },
      {
        nombre: "Jorge",
        id: "12345",
      },
      {
        nombre: "Carlos",
        id: "12345",
      },
      {
        nombre: "Arturo",
        id: "12345",
      },
      {
        nombre: "adolfo",
        id: "12345",
      },
      {
        nombre: "Bryan",
        id: "12345",
      },
      {
        nombre: "Jorge",
        id: "12345",
      },
      {
        nombre: "Carlos",
        id: "12345",
      },
      {
        nombre: "Arturo",
        id: "12345",
      },
    // Los demás mensajes seguirían aquí con la misma estructura
  ];

export default function TopicsCourseLayout({
  children,
  params, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: {
    course: string;
  };
}) {
  return (
    <div className="w-full flex flex-row  pt-[75px]">
        <div className='w-1/5  my-4 overflow-y-auto max-h-[85vh] text-white p-5'>
            <div className="flex items-center justify-center ">
                
                <p className="text-2xl text-center">Basic math</p>
                <Link href={`/s/courses/chat/${params.course}`} className='flex items-center py-2 px-4 rounded'>
                    <ChatBubbleIcon className="mr-2" />
                </Link> 
            </div>
            <Collapsible>
                <div className="relative inset-x-0 z-50">
                    <div 
                        className="rounded-md border px-4 py-3 mt-2 mb-7 font-mono text-sm flex flex-row items-center hover:bg-zinc-700 transition-colors duration-300"
                    >
                        <CollapsibleTrigger className="flex flex-row items-center justify-start w-full">
                            <Avatar>
                                <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <p className="mx-4">student topic</p>
                            <span><ChevronsUpDownIcon className="w-4 h-4"/></span>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                    {/* Paticipantes */}
                    {studentsInfo.map((student, index) => (
                        <div 
                            key={`${student.id}-s`} 
                            className="rounded-md border px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center hover:bg-zinc-700 transition-colors duration-300"
                        >
                            <div className="flex flex-row items-center justify-start">
                                <Avatar>
                                    <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <p className="mx-4">{student.nombre}</p>
                            </div>
                        </div>
                    ))}
                </CollapsibleContent>
                </div>
                
                
            </Collapsible>
        </div>
        <div className='w-4/5 overflow-y-auto max-h-[90vh]'>
          {children}
        </div>
    </div>
  );
}
