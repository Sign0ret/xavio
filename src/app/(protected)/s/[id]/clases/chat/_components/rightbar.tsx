'use client'
import React, { useState } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { 
  TextIcon,
  FileQuestionIcon,
  CheckIcon,
  BookIcon,
  ClipboardIcon,
  BookOpenIcon,
} from '@/components/icons';
import { HoverEffect } from '@/components/ui/card-hover-effect';

type Assignments = {
  id: string,
  type: string,
  title: string,
  description: string,
}

type Props = {
  params: {
    id: string;
    clase: string;
  };
};

export function Right_bar({ params }: Props) {
  const [value, setValue] = React.useState('tareas');
  const [tareas, setTareas] = React.useState<Assignments[] | null>(null);
  const [temas, setTemas] = React.useState<Assignments[] | null>(null);
  const [quizzes, setQuizzes] = React.useState<Assignments[] | null>(null);
  
  let content;
  switch (value) {
    case 'assignments':
      content = <HoverEffect params={params} items={projects} />;
      break;
    case 'temas':
      content = <HoverEffect params={params} items={projects} />;
      break;
    case 'tareas':
      content = <HoverEffect params={params} items={projects} />;
      break;
      case 'quizzes':
      content = <HoverEffect params={params} items={projects} />;
      break;
    default:
      content = <HoverEffect params={params} items={projects} />;
      break;
  }
  return (
    <Card className="border-none shadow-none min-w-full max-h-full min-h-full overflow-y-auto no-scrollbar">
        <CardHeader className='sticky top-0 z-50 bg-inherit py-2'>
            <CardTitle>
              <ToggleGroup
                type="single" 
                value={value}
                onValueChange={(value) => {
                  if (value) setValue(value);
                }}
              >
                <ToggleGroupItem value="assignments"><ClipboardIcon className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="temas"><BookOpenIcon className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value="tareas"><CheckIcon className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value="quizzes"><FileQuestionIcon className='h-4 w-4' /></ToggleGroupItem>              
              </ToggleGroup>
            </CardTitle>
            <CardDescription>
            </CardDescription>
            {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <div className="max-w-5xl mx-auto">
          {content}
        </div>
        
    </Card>
  )
}
export const projects = [
  {
    id: "aaa",
    type: "temas",
    title: "Tema 1",
    description:
      "A technology company that builds economic infrastructure for the internet.",
  },
  {
    id: "aaa",
    type: "tareas",
    title: "Tarea 1",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
  },
  {
    id: "aaa",
    type: "quizzes",
    title: "Quiz 1",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
  },
  {
    id: "aaa",
    type: "temas",
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
  },
  {
    id: "aaa",
    type: "temas",
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  },
  {
    id: "aaa",
    type: "temas",
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
  },
];
