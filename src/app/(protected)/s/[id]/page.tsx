import React from 'react';
  
export default function Perfil( { params }: {
  params: { id: string }
} ) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{params.id} Perfil</p>
    </main>
  );
}