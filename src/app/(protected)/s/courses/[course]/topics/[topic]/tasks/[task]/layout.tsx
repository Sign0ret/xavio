import { Button } from "@/app/(protected)/s/_components/ui/moving-border";
import { currentUser } from "@/lib/auth";
import { TSubmitT, TTask } from "@/models/Task";
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PostTask from "@/app/(protected)/s/_components/task/post-task";
import { TaskSideCard } from "@/app/(protected)/s/_components/task/task-sidecard";

type Props = {
  params: { 
    course: string,
    topic: string,
    task: string,
 },
  children: React.ReactNode
};

export default async function TaskLayout({ params, children }: Props) {
  const user = await currentUser();
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }
  try {
    const fetchTask = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/tasks/${params.task}`);
      const task = await res.json();
      // console.log(task.rubric)
      return task;
    }
    const taskDescription: TTask = await fetchTask();
    if (!taskDescription) {
      return (
        <div>ERROR FETCHING THE USER</div>
      )
    }
    const submit = taskDescription?.submits?.find((submit: TSubmitT) => submit.sender === user.id) || null;
    return (
      <div className="h-screen w-full">
      <div className="flex flex-col lg:flex-row">
        {/* left */}
        <div className="max-w-7xl flex w-full lg:w-2/5 flex-col items-start justify-end space-y-2 lg:p-0 h-screen"> 
          <div className="pl-14 w-full max-h-[90vh] h-full">
            <Button className="flex flex-col">
              {submit ? (
                <>
                  <TaskSideCard params={params} taskDescription={taskDescription} submit={submit}/>
                </>
            ) : (
              <>
                <h2>{taskDescription.task}</h2>
              </>
            )}
            <p>{taskDescription.instructions}</p>
            </Button>
          </div>
        </div>
      {/* right */}
      {children}
       </div>
    </div>
    );
  } catch(err:any) {
    return (
      <div>
        Error Fetching Quiz {user.id}
      </div>
    )
  }
}
