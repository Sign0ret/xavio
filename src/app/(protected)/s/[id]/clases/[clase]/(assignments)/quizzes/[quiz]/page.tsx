import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: { 
    id: string,
    avance: string,
    quiz: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Quiz de ${params.quiz}`
  }
} 

const quizInfo = [
  {
    id: "question1",
    question: "What is the capital of France?",
    weight: 1, // Importance of the question
    options: [
      { id: "option1", label: "Paris", isCorrect: true },
      { id: "option2", label: "London", isCorrect: false },
      { id: "option3", label: "Berlin", isCorrect: false }
    ]
  },
  {
    id: "question1",
    question: "What is the capital of France?",
    weight: 1, // Importance of the question
    options: [
      { id: "option1", label: "Paris", isCorrect: true },
      { id: "option2", label: "London", isCorrect: false },
      { id: "option3", label: "Berlin", isCorrect: false }
    ]
  }
];
  
export default function QuizClase( { params }: Props) {
 
  return (
    <main>
      <h2 className="mb-4 text-4xl font-bold">Quiz {params.quiz}</h2>
                {quizInfo.map((question, qIndex) => (
                  <section key={question.id} className="w-full lg:min-w-[900px] rounded-md bg-gray-200 p-8 my-4 overflow-y-auto max-h-[80vh]"> 
                    <h3 className="mb-8 text-3xl font-semibold">Question {qIndex+1}</h3>
                      <p className="mb-8 text-lg">{question.question}</p>
                      <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            {question.options?.map((option, oIndex) => (
                              <>
                                <input className="h-6 w-6" id={`option${oIndex}`} name={`question${qIndex}`} type="radio" />
                                <label className="text-xl" htmlFor="option1">
                                    {option.label}
                                </label>
                              </>
                            ))}
                            </div>
                          </div>
                    </section>
                ))}
    </main>
  );
}