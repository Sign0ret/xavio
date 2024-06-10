"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { XIcon } from "@/components/icons";
import { TSubmitT } from "@/models/Task";
import { TaskCheck } from "./task-check";

type Props = {
  params: {
    course: string,
    topic: string,
    task: string,
  };
  taskSubmits: TSubmitT[];
};

export default function TaskOthers({ params , taskSubmits}: Props) {
  const [compareSubmit, setCompareSubmit] = useState<TSubmitT | null>(null);
  const handleCompareClick = (submit: TSubmitT) => {
    setCompareSubmit(submit);
  };
  const handleCleanClick = () => {
    setCompareSubmit(null);
  };
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
                <p className="mx-4">{compareSubmit.sender}</p>
              </div>
              <p>{compareSubmit.grade} pts</p>
              <Button 
                className='bg-zinc-900 hover:bg-black transition-colors duration-300 bg-opacity-50'
                onClick={() => handleCleanClick()}   
              >
                <XIcon />
              </Button>
            </div>
            <TaskCheck params={params} taskSubmit={compareSubmit}/>
          </section>
        )}
      {/* viendo otros submits */}
        {taskSubmits.map((submit:TSubmitT) => (
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
              <Button 
                className='bg-zinc-900 hover:bg-black transition-colors duration-300 bg-opacity-50'
                onClick={() => handleCompareClick(submit)}   
              >
                review
              </Button>
            </div>
          ))}
    </div>
  )
}