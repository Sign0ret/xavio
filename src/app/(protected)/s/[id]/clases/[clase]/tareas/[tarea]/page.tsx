import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: { 
    id: string,
    clase: string,
    tarea: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Tarea de ${params.clase}:${params.tarea}`
  }
} 
  
export default function Tarea( { params }: Props) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Esta es la tarea {params.tarea} de la clase {params.clase}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}