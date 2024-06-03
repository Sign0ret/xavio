"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TQuiz, TSubmit } from '@/models/Quiz';
import { QuizCheck } from "../quiz-check";

type Props = {
  params: {
    course: string,
    topic: string,
    quiz: string,
  };
  quizSubmits: TSubmit[];
};

function QuizCompare({ params , quizSubmits}: Props) {
  const [compareSubmit, setCompareSubmit] = useState<TSubmit | null>(null);
  return (
    <div>
      {/* comparando */}
        {compareSubmit && (
          <section>
            <QuizCheck params={params} quizSubmit={compareSubmit}/>
          </section>
        )}
      {/* viendo otros submits */}
        {quizSubmits.map((submit) => (
            <div 
              key={submit._id} 
              className="rounded-md border px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center hover:bg-zinc-600 transition-colors duration-300 bg-opacity-10"
            >
              <div className="flex flex-row items-center justify-start">
                <Avatar>
                    <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p className="mx-4">{submit.sender}</p>
              </div>
              <p>{submit.grade} pts</p>
              <Button className='bg-zinc-900 hover:bg-black transition-colors duration-300 bg-opacity-50'>
                <Link href={`/s/courses/${params.course}/topics/${params.topic}/quizzes/${params.quiz}/${submit._id}`}>compare</Link>
              </Button>
            </div>
          ))}
    </div>
  )
}

export default QuizCompare