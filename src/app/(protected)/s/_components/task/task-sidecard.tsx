"use client"
import React, { use, useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { 
  FileQuestionIcon,
  CheckIcon,
  ClipboardIcon,
  BookOpenIcon,
} from '@/components/icons';
import { TQuiz, TSubmit } from '@/models/Quiz';
import { useCurrentUser } from '@/hooks/use-current-user';
import { TSubmitT, TTask } from '@/models/Task';
import TaskSelf from './task-self';
import TaskOthers from './task-others';

type Props = {
  params: {
    course: string,
    topic: string,
    task: string,
  };
  taskDescription: TTask;
  submit: TSubmitT;
};

export function TaskSideCard({ params, taskDescription, submit }: Props) {
  const user = useCurrentUser()
  const [value, setValue] = React.useState('self');
  if(!user){
    return;
  }
  let content = <></>;
    switch (value) {
        case 'self':
        content = <TaskSelf params={params} taskSubmit={submit}/>;
        break;
        case 'others':
        content = <TaskOthers params={params} taskSubmits={taskDescription.submits}/>;
        break;
        default:
        content = <TaskSelf params={params} taskSubmit={submit}/>;
        break;
    }
  return (
    <section> 
      <div className='flex flex-row justify-between items-center mb-8'>
          <h2>{taskDescription.task}</h2>
          <ToggleGroup
            type="single" 
            value={value}
            onValueChange={(value) => {
              if (value) setValue(value);
            }}
          >
            <ToggleGroupItem value="self"><CheckIcon className='h-4 w-4' /></ToggleGroupItem>
            <ToggleGroupItem value="others"><FileQuestionIcon className='h-4 w-4' /></ToggleGroupItem>              
          </ToggleGroup>
      </div>
        <div>
            {content}
        </div>
    </section>
  );
}
