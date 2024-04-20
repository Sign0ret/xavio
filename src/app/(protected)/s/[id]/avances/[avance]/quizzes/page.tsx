import React from 'react';
  
export default function QuizzesAvance( { params }: {
  params: { 
    id: string,
    avance: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, bienvenido a tus quizzes de {params.avance}</p>
      
    </main>
  );
}