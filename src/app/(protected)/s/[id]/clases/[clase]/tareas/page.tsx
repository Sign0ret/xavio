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
    title: `Tareas de ${params.clase}`
  }
} 
  
export default function Tareas( { params }: Props) {

  return (
    <div>
      <p>selecciona una tarea de la clase {params.clase}</p>
    </div>
  );
}