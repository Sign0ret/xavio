import { TQuiz } from '@/models/Quiz';
import React from 'react'

type Props = {
    params: {
        course: string,
        topic: string,
        quiz: string,
    };
    quizDescription: TQuiz;
};

export default function QuizContent({ params, quizDescription }: Props) {
  return (
    <div>QuizContent</div>
  )
}
