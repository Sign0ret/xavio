import React from 'react';
  
export default function QuizAvance( { params }: {
  params: { 
    id: string,
    avance: string,
    quiz: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, listo para el quiz {params.quiz} de {params.avance}</p>
      
    </main>
  );
}