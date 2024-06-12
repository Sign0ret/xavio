import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: { 
    course: string,
    topic: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `${params.course} task`,
    description: `Selected course task`
  }
} 
  
export default function Tareas( { params }: Props) {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>bienvenido a tus tasks de {params.course}</p>
    </main>
  );
}