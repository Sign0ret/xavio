import React from 'react';
  
export default function Recurso( { params }: {
  params: { 
    id: string,
    avance: string,
    recurso: string
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Recurso {params.recurso} del track de avance {params.avance}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}