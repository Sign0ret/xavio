import React from 'react';
import { Metadata } from 'next';
import { IQuiz, ISubmit } from '@/models/Quiz';
import Link from 'next/link';
import { currentUser } from '@/lib/auth';

type Props = {
  params: { 
    course: string,
    topic: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Quiz de ${params.course}`
  }
} 
  
export default async function QuizzesClase( { params }: Props) {
  const user = await currentUser();
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }
  try {
    const fetchQuizzes = async () => {
      const res = await fetch(`http://localhost:3000/api/courses/${params.course}/topics/${params.topic}/quizzes`);
      const quizzes = await res.json();
      console.log("quizzes:", quizzes);
      return quizzes;
    }
    const quizzes = await fetchQuizzes();
    // for each quiz, go inside submits, then try to find a submit with the sender 
    // that equals the user.session id, if there is one, then render the grade and a 
    // view button. if there is not one, render the due date and a start button. 
    return (
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            {params.course} - {params.topic}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Explore our collection of quizzes to test your knowledge.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {quizzes.map((quiz:IQuiz,idx:Number) =>{
             const userSubmit = quiz.submits.find((submit:ISubmit) => submit.sender === user.id);
             const now = new Date();
             // const dueDate = new Date(quiz.createdAt); 
             return (
              <div key={`quiz-${idx}`} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900 dark:shadow-none relative inset-x-0 z-50">
                <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-50">{quiz.quiz}</h2>
                {userSubmit ? (
                  <>
                    <p>Grade: {userSubmit.grade}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-900"
                    >
                      View
                    </Link>
                  </>
                ) : (
                  <>
                    <p>Due Date: {now.toLocaleDateString()}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-900"
                    >
                      Start Quiz
                    </Link>
                  </>
                )}
              </div>
            );
          } )}
        </div>
      </div>
    );
  } catch(err:any) {
    return (
      <div>
        Error Fetching Quizzes {user.id}
      </div>
    )
  }
  
}