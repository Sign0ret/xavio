import React from 'react';
  
export default function Clase( { params }: {
  params: { 
    id: string,
    clase: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Este sera un chat de la clase {params.clase}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}