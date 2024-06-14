"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TQuiz, TSubmit } from '@/models/Quiz';
import { QuizCheck } from "../quiz-check";
import { XIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { NameMember } from "@/models/Message";

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
  const [names, setNames] = useState<NameMember[] | null>(null);

  const handleCompareClick = (submit: TSubmit) => {
    setCompareSubmit(submit);
  };
  const handleCleanClick = () => {
    setCompareSubmit(null);
  };
  useEffect(() => {
    fetchNames(); // Fetch courses when component mounts

    // Cleanup function if needed
    return () => {
      // Cleanup code if any
    };
  }, []);

  const fetchNames = async () => {
    try {

      const names = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/members/names`);
      if (!names.ok) {
        throw new Error('Failed to fetch course');
      }
      const namesData = await names.json();
      setNames(namesData);

    } catch (error: any) {
    }
    }
  return (
    <div>
      {/* comparando */}
        {compareSubmit && (
          <section>
            <div 
              className="rounded-md border px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center hover:bg-zinc-600 transition-colors duration-300 bg-opacity-10"
            >
              <div className="flex flex-row items-center justify-start">
                <Avatar>
                    <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p className="mx-4">{compareSubmit.sender.length > 8 ? `${compareSubmit.sender.slice(0, 8)}...` : compareSubmit.sender}</p>
              </div>
              <p>{compareSubmit.grade} pts</p>
              <Button 
                className='bg-zinc-900 hover:bg-black transition-colors duration-300 bg-opacity-50'
                onClick={() => handleCleanClick()}   
              >
                <XIcon />
              </Button>
            </div>
            <QuizCheck params={params} quizSubmit={compareSubmit}/>
          </section>
        )}
      {/* viendo otros submits */}
        {quizSubmits?.map((submit:TSubmit) => {
          let name = (names?.find(item => item.member === submit.sender) || {}).name || 'anonym';
          return (
              <div 
                key={submit._id} 
                className="rounded-md border px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center hover:bg-zinc-600 transition-colors duration-300 bg-opacity-10"
              >
                <div className="flex flex-row items-center justify-start">
                  <Avatar>
                      <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <p className="mx-4">{name.length > 8 ? `${name.slice(0, 8)}...` : name}</p>
                </div>
                <p>{submit.grade} pts</p>
                <Button 
                  className='bg-zinc-900 hover:bg-black transition-colors duration-300 bg-opacity-50'
                  onClick={() => handleCompareClick(submit)}   
                >
                  compare
                </Button>
              </div>
            )
        } 
          )}
    </div>
  )
}

export default QuizCompare