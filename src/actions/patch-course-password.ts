"use server"

import { currentUser } from "@/lib/auth";

export async function patchCoursePassword(formData: FormData) {
    const user = await currentUser();
    const id = formData.get("id")?.toString();
    const password = formData.get("password")?.toString();
    if ((!password) || !user ){
        return;
    }
    const sendData = {
        password
    };
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData), // Replace `data` with the object containing the quiz fields to update
        });
        if (!res.ok) {
          throw new Error('Failed to fetch course');
        }
        const courseUpdated = await res.json();
        console.log("courseUpdated:",courseUpdated)
        // if (courseUpdated) {}
      } catch (error: any) {
        ;
      }
}