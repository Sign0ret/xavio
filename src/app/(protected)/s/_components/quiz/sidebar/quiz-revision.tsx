import React from 'react'
// import QuizInstructions from './quiz-instructions'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon, MessageCircleIcon } from '@/components/icons';
import { TQuiz, TSubmit } from '@/models/Quiz';

type Props = {
  params: {
    course: string,
    topic: string,
    quiz: string,
  };
  quizSubmit: TSubmit;
};

function QuizRevision({ params , quizSubmit}: Props) {
  console.log("updated:",quizSubmit.updatedAt)
  return (

    <div>
      <div className="flex flex-row justify-between mb-5">
        <p>Quizz Time: {quizSubmit.updatedAt ? quizSubmit.updatedAt.toString() : "undefined"} min</p>
        <p>{quizSubmit.grade} pts</p>
      </div>
      <div className='flex flex-row justify-left items-center pb-5'>
        <MessageCircleIcon className='w-4 h-4 mr-2' />
        <p>comentario del profesor</p>
      </div>
      <Collapsible>
        <CollapsibleTrigger className='flex flex-row justify-left items-center'>
          <p>Instructions</p>
          <ChevronsUpDownIcon className='h-4 w-4' />
        </CollapsibleTrigger>
        <CollapsibleContent className='bg-zinc-400 bg-opacity-10 rounded-md p-2'>
          {/* <QuizInstructions params={params} quizDescription={quizDescription}/> */}
        </CollapsibleContent>
      </Collapsible>

    </div>
  )
}

export default QuizRevision