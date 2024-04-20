import React from 'react';
  
export default function Tema( { params }: {
  params: { 
    id: string,
    clase: string,
    tema: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Este es el tema {params.tema} de la clase {params.clase}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}