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

function QuizInstructions({ params , quizDescription}: Props) {
  return (
    <div>
        <div className="space-y-4">
          <p>{quizDescription.instructions}</p>
        </div>
    </div>
  )
}

export default QuizInstructions