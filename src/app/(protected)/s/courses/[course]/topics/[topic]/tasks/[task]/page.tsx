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
import { 
  AvatarImage, 
  AvatarFallback, 
  Avatar 
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import SubmitComment from "@/app/(protected)/s/_components/task/submit-comment";
import { Metadata } from "next";
import { NameMember } from "@/models/Message";

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `${params.course} task`,
    description: `Submitted task`
  }
} 

type Props = {
  params: { 
    course: string,
    topic: string,
    task: string,
 }
};

export default async function TaskPage({ params }: Props) {
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
    const names = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/members/names`);
    if (!names.ok) {
      throw new Error('Failed to fetch course');
    }
    const namesData: NameMember[] | null = await names.json();
    if (!taskDescription) {
      return (
        <div>ERROR FETCHING THE USER</div>
      )
    }
    if(!namesData) return;
    const submit = taskDescription?.submits?.find((submit: TSubmitT) => submit.sender === user.id) || null;
    return (
      <div className="flex w-full lg:w-3/5 flex-col items-center justify-center space-y-2 lg:p-0 max-h-[70vh] h-[70vh] lg:h-[90vh] lg:max-h-[90vh]">
      <div>
        <div
          className="relative inset-x-0 max-h-[70vh] min-h-[70vh] lg:max-h-[90vh] lg:min-h-[90vh] max-w-2xl mx-auto z-50 w-full min-w-[50vw] h-full p-8 my-4 mb-8 pb-10 overflow-y-auto rounded-3xl bg-slate-800 opacity-80"
        >
          <div className="flex flex-row justify-between mb-4 text-right">
            <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem >Mine</BreadcrumbItem>
                  <BreadcrumbSeparator />
              </BreadcrumbList>
              </Breadcrumb>
            <h1 className="text-white">
              Grade: coming/soon
            </h1>
          </div>
          {submit ? (
            <section>
              <Table>
                <TableCaption>{taskDescription.task}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criterion</TableHead>
                    <TableHead>Max Points</TableHead>
                    <TableHead>Obtained</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskDescription.rubric?.map((criterion, index) => (
                    <TableRow key={criterion._id}>
                      <TableCell className="font-medium">{taskDescription.rubric[index].criterion}</TableCell>
                      <TableCell>{taskDescription.rubric[index].points}</TableCell>
                      <TableCell>coming soon</TableCell>
                      {/* <TableCell className="font-medium">{criterion.criterion}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">coming/soon</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              {submit.url && (
                <>
                {submit.text && (<p className="text-white p-4">{submit.text}</p>)}
                  <img className="w-1/3" src={submit.url}></img>
                </>
              )}

              <div className="mt-5">
              {/* Se ponen los comentarios existentes */}
              {/* Contenedor comentario */}
              {submit?.messages?.length > 0 && (
                <div>
                  {submit.messages.map((message, idx) => {
                    let name = (namesData?.find(item => item.member === message.sender) || {}).name || 'anonym';
                    return (
                      <div className="flex items-center" key={message._id || idx}>
                        <Avatar className="w-6 h-6">
                          <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="text-sm">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h1 className="ml-2 text-white">{message.message}</h1>
                          {/* <p className="ml-2 text-xs text-white right-0">{message.createdAt ? message.createdAt?.toString() : "--/--/--"}</p> */}
                          <p className="ml-2 text-xs text-white right-0">{name}</p>
                        </div>
                      </div>
                    )
                  } 
                  )}
                </div>
              )}
              </div>
              {/* Form para agregar comentario */}
              <SubmitComment params={params} submit={submit._id} />
            </section>
          ) : (
            <PostTask params={params} />
          )}
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
