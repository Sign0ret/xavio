import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
      id: string;
      clase: string;
      quiz: string;
    };
    quizDescription: {
      topic: string,
      description: string,
      lastUpdated: string,
      contributor: string,
    };
  };

function QuizDescription({ params , quizDescription}: Props) {
  return (
    <div>
        <div className="flex flex-row justify-between mb-5">
            <p>Duration: 15:30 min</p>
            <p>10 questions</p>
            <p>100pts</p>
            
        </div>
        <div className="space-y-4">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, laborum. Beatae sint quidem nam repudiandae!</p>
        </div>
        <Link
            href={`/s/${params.id}/clases/${params.clase}/quizzes/${params.quiz}/doing`}
            className="flex items-right border-2 border-white text-white font-bold mt-4 rounded-lg px-4 py-2"
        >
            Begin quiz
        </Link>
    </div>
  )
}

export default QuizDescription