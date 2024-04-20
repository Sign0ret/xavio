import React from 'react';
  
export default function Recursos( { params }: {
  params: { 
    id: string,
    avance: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Estos son los recursos del avance {params.avance}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}