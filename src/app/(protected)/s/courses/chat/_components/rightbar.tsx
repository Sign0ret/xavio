'use client'
import React, { useEffect, useState } from 'react';

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
import { TCourse } from '@/models/Course';
import { ByQuizzes, ByTask, ByTopic, ByContent } from './rightbar-blocks/by';

type Props = {
  params: {
    course: string;
  },
  courseInfo: TCourse,
};

export function Right_bar({ params, courseInfo }: Props) {
  const [value, setValue] = React.useState('assignments');
  
  let content;
  switch (value) {
    case 'assignments':
      content = <ByTopic params={params} items={courseInfo?.topics} />;
      break;
    case 'temas':
      content = <ByContent params={params} items={courseInfo?.topics} />;
      break;
    case 'tareas':
      content = <ByTask params={params} items={courseInfo?.topics} />;
      break;
      case 'quizzes':
        content = <ByQuizzes params={params} items={courseInfo?.topics} />;
        break;
    default:
      content = <ByTopic params={params} items={courseInfo?.topics} />;
      break;
  }
  return (
    <Card className="border-none shadow-none min-w-full max-h-full min-h-full overflow-y-auto no-scrollbar bg-zinc-900">
        <CardHeader className='sticky top-0 z-50 bg-inherit py-2'>
            <CardTitle>
              <ToggleGroup
                type="single" 
                value={value}
                onValueChange={(value) => {
                  if (value) setValue(value);
                }}
              >
                <ToggleGroupItem value="assignments" className='text-purple-500 hover:bg-zinc-800'><ClipboardIcon className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="temas"  className='text-purple-500  hover:bg-zinc-800'><BookOpenIcon className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value="tareas"  className='text-purple-500  hover:bg-zinc-800'><CheckIcon className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value="quizzes"  className='text-purple-500  hover:bg-zinc-800'><FileQuestionIcon className='h-4 w-4' /></ToggleGroupItem>              
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