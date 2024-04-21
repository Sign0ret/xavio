import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string,
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Sesion de ${params.id}`
  }
} 
  
export default function Perfil( { params }: Props ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id} Perfil</p>
    </main>
  );
}