"use client"
import React, { useEffect } from 'react'
import QuizInstructions from './quiz-instructions';
import QuizData from './quiz-data';
import { ISubmit, TQuiz, TSubmit } from '@/models/Quiz';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/auth';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useRouter } from "next/navigation";

type Props = {
    params: {
      course: string,
      topic: string,
      quiz: string,
    };
    quizDescription: TQuiz;
  };

function QuizDescription({ params , quizDescription}: Props) {
  const user = useCurrentUser()
  const router = useRouter();
  console.log("quizDescription:",quizDescription)
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }
  const submitData = {
      sender: user.id,
      grade: 0,
      answers: quizDescription.structure,
      open: true
  };  
  console.log({submitData})
    const beginQuiz = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/quizzes/${params.quiz}/submits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData), // Replace `data` with the object containing the quiz fields to update
        });
        if (!res.ok) {
          throw new Error('Failed to fetch course');
        }
        const quiz = await res.json();
        router.refresh();
      } catch (error: any) {
        ;
      }
    };
  return (
    <div>
        <QuizData params={params} quizDescription={quizDescription}/>
        <QuizInstructions params={params} quizDescription={quizDescription}/>
        <Button
          className="flex items-center border-2 border-white text-white font-bold mt-4 rounded-lg px-4 py-2"
          onClick={() => beginQuiz()}
        >
          Begin quiz
        </Button>
    </div>
  )
}

export default QuizDescription