import React from 'react';
import { Metadata } from 'next';
import { QuizDo } from '@/app/(protected)/s/_components/quiz/quiz-do';


type Props = {
  params: { 
    course: string,
    topic: string,
    quiz: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Quiz de ${params.quiz}`
  }
}
  
export default function QuizDoing( { params }: Props) {
 
  return (
    <QuizDo params={params} onSubmit={() => {}}/>
  );
}