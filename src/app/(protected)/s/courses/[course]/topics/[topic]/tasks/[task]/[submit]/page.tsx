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
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

type Props = {
  params: { 
    course: string,
    topic: string,
    task: string,
    submit: string
 }
};

export default async function QuizClase({ params }: Props) {
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
    const submit = taskDescription?.submits?.find((submit: TSubmitT) => submit._id === params.submit) || null;
    return (
      <div className="flex w-full lg:w-3/5 flex-col items-center justify-center p-8 ">
      <div>
        <div
          className="relative inset-x-0 max-h-[90vh] min-h-[90vh] max-w-2xl mx-auto z-50 w-full min-w-[50vw] h-full p-8 my-4 overflow-y-auto rounded-3xl bg-slate-800 opacity-80"
        >
          <div className="flex flex-row justify-between mb-4 text-right">
            <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem >
                  <BreadcrumbLink href={`/s/courses/${params.course}/topics/${params.topic}/tasks/${params.task}`}>Mine</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-white">{submit?.sender}</BreadcrumbItem>
              </BreadcrumbList>
              </Breadcrumb>
            <h1 className="text-white">
              Grade: {submit ? (submit.grade !== null ? `${submit.grade}/${taskDescription.maxpoints }` : '--/100') : '--/100'}
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
                  {submit.rubric.map((criterion, index) => (
                    <TableRow key={criterion._id}>
                      <TableCell className="font-medium">{taskDescription.rubric[index].criterion}</TableCell>
                      <TableCell>{taskDescription.rubric[index].points}</TableCell>
                      <TableCell>{criterion.points}</TableCell>
                      <TableCell className="font-medium">{criterion.criterion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{submit.grade}pts/{taskDescription.maxpoints}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              {submit.url && (
                <>
                  <p>{submit.url}</p>
                  <img className="w-1/3" src={submit.url}></img>
                </>
              )}
            </section>
          ) : (
            <>No submit found</>
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
