"use client"
import React, { use, useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { 
  FileQuestionIcon,
  CheckIcon,
  ClipboardIcon,
  BookOpenIcon,
} from '@/components/icons';
import QuizDescription from './sidebar/quiz-description';
import QuizDoing from './sidebar/quiz-doing';
import QuizRevision from './sidebar/quiz-revision';
import QuizCompare from './sidebar/quiz-compare';
import { TQuiz, TSubmit } from '@/models/Quiz';
import { useCurrentUser } from '@/hooks/use-current-user';

type Props = {
  params: {
    course: string,
    topic: string,
    quiz: string,
  };
  quizDescription: TQuiz;
};

export function QuizSideCard({ params, quizDescription }: Props) {
  const user = useCurrentUser()
  const [value, setValue] = React.useState('revision');
  if(!user){
    return;
  }
  console.log("iduser:",user)
  const submit = quizDescription?.submits?.find((submit: TSubmit) => submit.sender === user.id) || null;
  console.log("submit",submit)
  // Renderizamos Quiz Previo a hacerse
  let content = <QuizDescription params={params} quizDescription={quizDescription}/>;
  if (submit && submit.open){

    // Si el quiz est;a abierto, renderizamos quiz doing
    content = <QuizDoing params={params} quizDescription={quizDescription}/>;
  }
  if (submit && !submit.open){
    // Si el quiz est;a abierto, renderizamos quiz doing
    switch (value) {
      case 'revision':
        content = <QuizRevision params={params} quizSubmit={submit}/>;
        break;
        case 'compare':
        content = <QuizCompare params={params} quizSubmits={quizDescription.submits}/>;
        break;
      default:
        content = <QuizRevision params={params} quizSubmit={submit}/>;
        break;
    }
  }
  return (
    <section className="w-full rounded-md bg-zinc-700 p-8 my-4 overflow-y-auto max-h-[80vh] text-white"> 
      <div className='flex flex-row justify-between items-center mb-8'>
        <h3 className="text-3xl font-semibold">{quizDescription.quiz}</h3>
        {submit && !submit.open && (
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
        )}
      </div>
        <div>
          {content}
        </div>
    </section>
  );
}
