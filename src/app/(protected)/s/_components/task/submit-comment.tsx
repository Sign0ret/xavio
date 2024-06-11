"use client";
import { postSubmitComment } from '@/actions/post-submit-comment'
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button as ButtonSubmit } from "@/components/ui/button"
import React from 'react'
import { useState } from 'react';
import { Input } from '@/components/ui/input';

type Props = {
    params: { 
      course: string,
      topic: string,
      task: string,
    }
    submit: string
  };

export default function SubmitComment({params, submit}: Props) {
    const user = useCurrentUser()
    const [submitted, setSubmitted] = useState(false);
    if(!user) return;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      await postSubmitComment(new FormData(event.currentTarget));
  
      setSubmitted(true);
    };
  
    if (submitted) {
      window.location.reload();
    }
  
    return (
        <form onSubmit={handleSubmit} className='flex flex-row gap-4 mb-5 mt-5'>
           <input type="hidden" name="sender" value={user.id} />
            <input type="hidden" name="course" value={params.course} />
            <input type="hidden" name="topic" value={params.topic} />
            <input type="hidden" name="task" value={params.task} />
            <input type="hidden" name="submit" value={submit} />

            <Input  
                name="message"
                className="flex-1 bg-zinc-200" 
                placeholder="Type a comment..."
            />
            <ButtonSubmit  
                className='bg-purple-600 text-white' 
                type='submit'
                >
                Send
            </ButtonSubmit>
        </form>
      );
}
