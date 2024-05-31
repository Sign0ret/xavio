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
import QuizOpen from './content/quiz-open';

type Props = {
  params: {
    course: string,
    topic: string,
    quiz: string,
  };
  quizDescription: TQuiz;
};

export function QuizContent({ params, quizDescription }: Props) {
  const user = useCurrentUser()
  if(!user){
    return;
  }
  const submit = quizDescription?.submits?.find((submit: TSubmit) => submit.sender === user.id) || null;
  // Renderizamos Quiz Previo a hacerse
  let content = <p className='text-white'>Haz Click en iniciar para comenzar con tu Quiz.</p>;
  if (submit && submit.open){
    // Si el quiz est;a abierto, renderizamos quiz doing
    content = <QuizOpen params={params} quizSubmit={submit}/>;
  }
  if (submit && !submit.open){
    // Si el quiz est;a abierto, renderizamos quiz doing
  }
  return (
    <section className="w-full rounded-md bg-zinc-700 p-8 my-4 overflow-y-auto max-h-[80vh] text-white"> 
      <h2 className="mb-4 text-4xl font-bold text-white">{quizDescription.quiz}</h2>
      {content}
    </section>
  );
}
