"use client"
import { BackgroundBeams } from '@/components/ui/background-gradient-animation';
import React from 'react';

type Props = {
  params: { 
    id: string,
 }
};
  
export default function Chat( { params }: Props) {
    return (
        <div className='bg-zinc-900'>
          <BackgroundBeams/>
        </div>
    )
}