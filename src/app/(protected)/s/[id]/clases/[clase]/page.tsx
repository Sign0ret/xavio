import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: { 
    id: string,
    clase: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Clase de ${params.clase}`
  }
} 
  
export default function Clase( { params }: Props) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, bienvenido a tu clase {params.clase}</p>
      {/* Aqui va la sidebar de Bloques */}
    </main>
  );
}