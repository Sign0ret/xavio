import React from 'react';
  
export default function Tarea( { params }: {
  params: { 
    id: string,
    clase: string,
    tarea: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Esta es la tarea {params.tarea} de la clase {params.clase}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}