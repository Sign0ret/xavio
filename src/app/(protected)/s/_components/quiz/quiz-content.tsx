"use client"
import React from 'react';
import { TQuiz, TSubmit } from '@/models/Quiz';
import { useCurrentUser } from '@/hooks/use-current-user';
import QuizOpen from './content/quiz-open';
import { QuizCheck } from './quiz-check';
import { Badge } from '@/components/ui/badge';

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
    content = <QuizCheck params={params} quizSubmit={submit}/>;
  }
  return (
    <section className="w-full rounded-md bg-zinc-700 p-8 my-4 overflow-y-scroll max-h-[84vh] text-white"> 
    <div className='flex flex-row justify-between align-center items-center'>
      <h2 className="mb-4 text-4xl font-bold text-white">{quizDescription.quiz}</h2>
      {submit && !submit.open && <Badge className="bg-gray-200 mb-4 text-3xl font-bold text-zinc-900">{submit.grade}/{quizDescription.maxpoints}</Badge>}
    </div>
      {content}
    </section>
  );
}
