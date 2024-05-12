import React from 'react';

type Props = {
  params: { 
    course: string,
    topic: string,
 }
};

export default function QuizClase({ params }: Props) {
    return (
        <div>
            curso  {params.topic}
        </div>
    )
}