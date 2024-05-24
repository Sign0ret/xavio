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
    // Si no existe un submit del usuario, to-do [endpoint restfull]
      // BEGIN QUIZ --> conectarse al websocket (tiempo comienza).
      // condicion 2 --> doing
    // Si no existe un submit del usuario, pero existe una conexión del usuario con el quiz websocket {user.id, quiz.id}, doing. [endpoint ws]
    // Si existe el submit del usuario, revision & compare. [endpoint restfull]

    // time num -> puts cada segundo
    // 10:28 {quiz.submit.timestamp.create} timestamp Date 0
    // time 40min {quiz.timelimit}
    // 11:08 timestamp Date n
    // During quiz: 1m on UseEffect --> new Date timestamp x > n
      // save and close
      // else: save

    // page quiz
      // existe usuario?
      // existe quiz?
      // conditional rendering
        // si no existe submit: {rest}
          // render start quiz message + quiz description Layout
            // onClick ==> post empty submit
              // sender=user.id
              // grade=0
              // open=true
        // si existe submit y open=true {ws}
          // render quiz doing + quiz remaining Layout
            // on 1 min useEffect compare timestampz
              // save answers 
              // if limit passed: set open false + calificar endpoint
        // si existe submit y open=false {rest}
          // render quiz revision + quiz compare
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