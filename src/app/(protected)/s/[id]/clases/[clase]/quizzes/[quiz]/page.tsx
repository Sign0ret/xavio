import React from 'react';
  
export default function QuizClase( { params }: {
  params: { 
    id: string,
    clase: string,
    quiz: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, listo para el quiz {params.quiz} de {params.clase}</p>
      
    </main>
  );
}