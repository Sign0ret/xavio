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
  
  async function postTask(formData: FormData) {
    const text = formData.get("text")?.toString();
    const url = formData.get("url")?.toString();
    const comments = formData.get("comments")?.toString();

    if (!text || !url || !comments || !user ){
        return;
    }
    const submitData = {
      submits: {  
        sender: user.id,
        grade: 85,
        text: text,
        url: url,
        comments: comments
      }
    };  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/tasks/${params.task}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData), // Replace `data` with the object containing the quiz fields to update
      });
      if (!res.ok) {
        throw new Error('Failed to fetch course');
      }
      const task = await res.json();
      console.log({task})      
    } catch (error: any) {
      ;
    }
  }
  try {
    const fetchTask = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/tasks/${params.task}`);
      const task = await res.json();
      console.log(task.rubric)
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
                Calificacion: {submit ? (submit.grade !== null ? `${submit.grade}/${taskDescription.maxpoints }` : '--/100') : '--/100'}
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
              </section>
            ) : (
              <form className="space-y-4" action={postTask}>
                <h1 className="text-white">Respuesta por entrada de texto o URL</h1>
                <div className="flex items-center space-x-4">
                  <textarea
                    name="text"
                    className="w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline bg-white"
                    placeholder="Escribe aquí tu respuesta"
                  ></textarea>
                </div>
                <div>
                  <h1 className="text-white">Archivos de la entrega</h1>
                  <input name="url" type="file" className="border rounded-lg p-2 bg-white" />
                </div>
                <div>
                  <h1 className="text-white">Comentarios de la entrega</h1>
                  <input
                    name="comments"
                    type="text"
                    className="w-[40%] p-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Escribe aquí tu comentario"
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    className="hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-3xl bg-slate-900"
                    type="submit"
                  >
                    Enviar
                  </button>
                </div>
              </form>
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
