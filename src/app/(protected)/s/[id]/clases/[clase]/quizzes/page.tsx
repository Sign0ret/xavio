import React from 'react';
  
export default function QuizzesClase( { params }: {
  params: { 
    id: string,
    clase: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, bienvenido a tus quizzes de {params.clase}</p>
      
    </main>
  );
}