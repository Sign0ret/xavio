"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { XIcon } from "@/components/icons";
import { TSubmitT } from "@/models/Task";
import { TaskCheck } from "./task-check";
import Link from "next/link";
import { NameMember } from "@/models/Message";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  params: {
    course: string,
    topic: string,
    task: string,
  };
  taskSubmits: TSubmitT[];
  names: NameMember[] | null;
};

export default function TaskOthers({ params , taskSubmits, names}: Props) {
  const user = useCurrentUser()
  const [compareSubmit, setCompareSubmit] = useState<TSubmitT | null>(null);
  const handleCompareClick = (submit: TSubmitT) => {
    setCompareSubmit(submit);
  };
  const handleCleanClick = () => {
    setCompareSubmit(null);
  };
  if (!names) return;
  if (!user) return;
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
              {/* <p>{compareSubmit.grade} pts</p> */}
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
        {taskSubmits.map((submit:TSubmitT) => {
          let name = (names?.find(item => item.member === submit.sender) || {}).name || 'anonym';
          if (submit.sender === user.id) return;
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
                <p>{submit.messages?.length}<span className="hidden lg:flex">msg</span></p>
                <Link 
                  className='bg-zinc-900 rounded hover:bg-black transition-colors duration-300 bg-opacity-50 p-2'
                  href={`/s/courses/${params.course}/topics/${params.topic}/tasks/${params.task}/${submit._id}`}   
                >
                  review
                </Link>
              </div>
            )
        } 
          )}
    </div>
  )
}