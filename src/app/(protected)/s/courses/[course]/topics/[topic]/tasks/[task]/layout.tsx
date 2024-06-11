import { Button as AButton } from "@/app/(protected)/s/_components/ui/moving-border";
import { Button } from "@/components/ui/button";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

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
      <div className="h-screen w-full pt-[70px]">
      <div className="hidden lg:flex flex-col lg:flex-row">
        {/* left */}
        <div className="flex w-full lg:w-2/5 flex-col items-start justify-end space-y-2 lg:p-0 max-h-[90vh] min-h-[90vh]"> 
          <div className="pl-14 w-full max-h-[90vh] h-full mb-2">
            <AButton className="flex flex-col">
                <div className="max-h-full overflow-y-scroll">
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
                </div>
            </AButton>
          </div>
        </div>
      {/* right */}
      {children}
       </div>
       <div className="lg:hidden flex w-full flex-col items-center justify-center relative inset-x-0 mx-auto z-50">
              <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="default" className="mb-4 bg-slate-800/[0.8] border-slate-800 text-white backdrop-blur-xl">Instrucciones | {params.task}</Button>
                  </DrawerTrigger>
                  <DrawerContent className='max-h-[vh-80] max-w-[vw-80] overflow-y-hidden bg-slate-800/[0.8] border-slate-800'>
                      <DrawerDescription>
                        <AButton className="flex flex-col">
                          <div className="max-h-full overflow-y-scroll">
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
                          </div>
                        </AButton>
                      </DrawerDescription>
                  </DrawerContent>
              </Drawer>
              <div>
                  {children}
              </div>
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
