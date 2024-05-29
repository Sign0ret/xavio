import React from 'react'
import QuizInstructions from './quiz-instructions'
import QuizData from './quiz-data';
import { QuizDo } from '../quiz-do';
import { TQuiz } from '@/models/Quiz';

type Props = {
  params: {
    course: string,
    topic: string,
    quiz: string,
  };
  quizDescription: TQuiz;
};

function QuizDoing({ params , quizDescription }: Props) {
  return (
    <div> 
      <QuizData params={params} quizDescription={quizDescription}/>
      <div className='flex flex-row justify-left items-center my-5'>
        <p className='text-xl pr-1'>Remaining Time:</p>
        <div>
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": 10 } as React.CSSProperties}></span>h
            <span style={{ "--value": 24 } as React.CSSProperties}></span>m
            <span style={{ "--value": 41 } as React.CSSProperties}></span>s
          </span>
        </div>
      </div>
      <QuizInstructions params={params} quizDescription={quizDescription}/>
    </div>
  )
}

export default QuizDoing