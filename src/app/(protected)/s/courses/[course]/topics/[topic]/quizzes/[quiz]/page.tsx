import React from 'react';
import { Metadata } from 'next';
import { currentUser } from '@/lib/auth';
import { QuizContent } from '@/app/(protected)/s/_components/quiz/quiz-content';

type Props = {
  params: { 
    course: string,
    topic: string,
    quiz: string,
 }
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Quiz de ${params.quiz}`
  }
} 

export default async function QuizCourse( { params }: Props) {
  const user = await currentUser();
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }
  try {
    const fetchQuiz = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/quizzes/${params.quiz}`);
      const quiz = await res.json();
      return quiz;
    }
    const quizDescription = await fetchQuiz();
    if (!quizDescription) {
      return (
        <div>ERROR FETCHING THE USER</div>
      )
    }
    return (
      <QuizContent params={params} quizDescription={quizDescription} />
      // <div>
      //   <div className="text-white">
      //     <p>Haz Click en iniciar para comenzar con tu Quiz.</p>
      //   </div>
      // </div>
      
    );
  } catch(err:any) {
    return (
      <div>
        Error Fetching Quiz {user.id}
      </div>
    )
  }
}