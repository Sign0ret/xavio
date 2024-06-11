"use server"

import { currentUser } from "@/lib/auth";

export async function postSubmitComment(formData: FormData) {
    console.log("entro al adios")
    const user = await currentUser();
    const sender = formData.get("sender")?.toString();
    const message = formData.get("message")?.toString();

    const course = formData.get("course")?.toString();
    const topic = formData.get("topic")?.toString();
    const task = formData.get("task")?.toString();
    const submit = formData.get("submit")?.toString();

    const sendData = {
      sender,
      message,
      block: 1
    };
    console.log({sendData})
    if ((!message) || !sender ){
        return; 
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${course}/topics/${topic}/tasks/${task}/submits/${submit}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData), // Replace `data` with the object containing the quiz fields to update
        });
        if (!res.ok) {
          throw new Error('Failed to fetch course');
        }
        // const courseUpdated = await res.json();
        // if (courseUpdated) {}
      } catch (error: any) {
        ;
      }
}