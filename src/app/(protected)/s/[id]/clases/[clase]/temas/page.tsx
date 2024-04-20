import React from 'react';
  
export default function Temas( { params }: {
  params: { 
    id: string,
    clase: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Estos son los temas de la clase {params.clase}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}