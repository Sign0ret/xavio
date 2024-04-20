import React from 'react';
  
export default function Avances( { params }: {
  params: { 
    id: string,
 }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id}, bienvenido a tu avance</p>
      
    </main>
  );
}