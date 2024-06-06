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

type Props = {
  params: { 
    course: string,
    topic: string,
    task: string,
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
    const submit = taskDescription?.submits?.find((submit: TSubmitT) => submit.sender === user.id) || null;
    return (
      <div className="h-screen w-full">
      <div className="flex flex-col lg:flex-row">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex w-full lg:w-2/5 flex-col items-start justify-end space-y-2 p-[40px] lg:p-0 h-screen">
            <br/>
            <br/>
            <br/>   
        <div className="pl-14 w-full max-h-[90vh] h-full">
          <Button className="p-20 flex flex-col">
            <h2>{taskDescription.task}</h2>
            <p>{taskDescription.instructions}</p>
          </Button>
        </div>
        </div>
        <div className="flex w-full lg:w-3/5 flex-col items-center justify-center p-8">
        <div>
          <div
            className="relative inset-x-0 max-w-2xl mx-auto z-50 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] lg:min-w-[900px] h-full p-8 my-4 overflow-y-auto max-h-[90vh] rounded-3xl bg-slate-800 opacity-80"
          >
            <div className="flex justify-end mb-4 text-right">
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
              <PostTask params={params}/>
            )}
          </div>
        </div>
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
