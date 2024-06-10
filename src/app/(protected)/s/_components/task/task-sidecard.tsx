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
import TaskRevision from './task-revision';
import TaskCompare from './task-compare';

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
  const [value, setValue] = React.useState('revision');
  if(!user){
    return;
  }
  let content = <></>;
    switch (value) {
        case 'revision':
        content = <TaskRevision params={params} taskSubmit={submit}/>;
        break;
        case 'compare':
        content = <TaskCompare params={params} taskSubmits={taskDescription.submits}/>;
        break;
        default:
        content = <TaskRevision params={params} taskSubmit={submit}/>;
        break;
    }
  return (
    <section> 
      <div className='flex flex-row justify-between items-center mb-8'>
          <ToggleGroup
            type="single" 
            value={value}
            onValueChange={(value) => {
              if (value) setValue(value);
            }}
          >
            <ToggleGroupItem value="revision"><CheckIcon className='h-4 w-4' /></ToggleGroupItem>
            <ToggleGroupItem value="compare"><FileQuestionIcon className='h-4 w-4' /></ToggleGroupItem>              
          </ToggleGroup>
      </div>
        <div>
            {content}
        </div>
    </section>
  );
}
