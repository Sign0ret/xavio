import React from 'react';

export default function Tareas( { params }: {
  params: { 
    id: string,
    clase: string,
  }
} ) {
    
  return (
    <div>
      <p>selecciona una tarea de la clase {params.clase}</p>
    </div>
  );
}