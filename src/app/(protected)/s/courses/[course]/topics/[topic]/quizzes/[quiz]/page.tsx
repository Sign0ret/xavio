import React from 'react';
import { Metadata } from 'next';
import { currentUser } from '@/lib/auth';

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
      console.log("quiz:", quiz);
      return quiz;
    }
    const quiz = await fetchQuiz();
    if (!quiz) {
      return (
        <div>ERROR FETCHING THE USER</div>
      )
    }
    return (
      <div>
        <div className="text-white">
          <p>Haz Click en iniciar para comenzar con tu Quiz.</p>
        </div>
      </div>
      
    );
  } catch(err:any) {
    return (
      <div>
        Error Fetching Quiz {user.id}
      </div>
    )
  }
}