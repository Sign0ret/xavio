import React from 'react';
  
export default function Avance( { params }: {
  params: { 
    id: string,
    avance: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, bienvenido a {params.avance}</p>
    </main>
  );
}