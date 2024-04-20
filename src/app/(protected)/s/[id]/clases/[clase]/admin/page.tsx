import React from 'react';
  
export default function AdminClase( { params }: {
  params: { 
    id: string,
    clase: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, aqui puedes administrar tu clase {params.clase}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}