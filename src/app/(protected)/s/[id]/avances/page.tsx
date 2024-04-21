import React from 'react';

import { Metadata } from 'next';

type Props = {
  params: { 
    id: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Avances de ${params.id}`
  }
} 
  
export default function Avances( { params }: Props) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, bienvenido a tu avance</p>
      
    </main>
  );
}