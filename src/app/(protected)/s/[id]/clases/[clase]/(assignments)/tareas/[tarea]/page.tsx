import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: { 
    id: string,
    avance: string,
    tarea: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Tarea ${params.tarea}`
  }
} 

const tareaInfo = {
    id: "tarea1",
    question: "What is the capital of France?",
    weight: 1, // Importance of the question
    options: [
      { id: "option1", label: "Paris", isCorrect: true },
      { id: "option2", label: "London", isCorrect: false },
      { id: "option3", label: "Berlin", isCorrect: false }
    ]
  }
  
export default function QuizClase( { params }: Props) {
 
  return (
    <main>
      <h2 className="mb-4 text-4xl font-bold">Tarea {params.tarea}</h2>
                  <section key={tareaInfo.id} className="w-full lg:min-w-[900px] rounded-md bg-gray-200 p-8 my-4 overflow-y-auto max-h-[80vh]"> 
                      <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            
                            </div>
                          </div>
                    </section>
    </main>
  );
}