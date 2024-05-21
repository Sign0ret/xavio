import React from 'react';
import { Metadata } from 'next';
import { QuizCheck } from '@/app/(protected)/s/_components/quiz/quiz-check';

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

export default function QuizCompare( { params }: Props) {

  return (
    <QuizCheck params={params} />
  );
}