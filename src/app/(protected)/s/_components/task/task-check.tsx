"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TSubmit } from "@/models/Quiz";
import { CheckIcon, XIcon } from "@/components/icons";
import { TSubmitT } from "@/models/Task";

type Props = {
    params: { 
        course: string,
        topic: string,
        task: string,
    },
    taskSubmit: TSubmitT,
};

export function TaskCheck({ params, taskSubmit}: Props) {
    return (
        <div className='max-h-full pb-20'>
          
        </div>
    );
}
