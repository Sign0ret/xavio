import { TQuiz } from '@/models/Quiz';
import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
      course: string,
      topic: string,
      quiz: string;
    };
    quizDescription: TQuiz;
  };

function QuizData({ params , quizDescription}: Props) {
  const numQuestions = quizDescription?.structure?.length || 0;
  return (
    <div>
        <div className="flex flex-row justify-between mb-5">
            <p>Duration: {quizDescription.timelimit} min</p>
            <p>{numQuestions} questions</p>
            <p>{quizDescription.maxpoints}pts</p>
        </div>
    </div>
  )
}

export default QuizData