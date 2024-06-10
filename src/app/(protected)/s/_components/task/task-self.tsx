import React from 'react'
// import QuizInstructions from './quiz-instructions'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon, MessageCircleIcon } from '@/components/icons';
import { TSubmitT } from '@/models/Task';

type Props = {
  params: {
    course: string,
    topic: string,
    task: string,
  };
  taskSubmit: TSubmitT;
};

export default function TaskSelf({ params , taskSubmit}: Props) {
  console.log("updated:",taskSubmit.updatedAt)
  return (
    <div>
      <div className="flex flex-row justify-between mb-5">
        <p>Submited at: {taskSubmit.createdAt ? taskSubmit.createdAt.toString() : "undefined"} min</p>
        <p>{taskSubmit.grade} pts</p>
      </div>
      <div className='flex flex-row justify-left items-center pb-5'>
        <MessageCircleIcon className='w-4 h-4 mr-2' />
        <p>comentario del profesor</p>
      </div>
    </div>
  )
}