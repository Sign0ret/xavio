"use server"

import { currentUser } from "@/lib/auth";

export async function oatchKickout(formData: FormData) {
    const user = await currentUser();
    const description = formData.get("description")?.toString();
    const id = formData.get("id")?.toString();
    const course = formData.get("course")?.toString();
    const sendData = {
      course,
      description
    };
    if ((!description) || !user ){
        return;
    }

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
        // const courseUpdated = await res.json();
        // if (courseUpdated) {}
      } catch (error: any) {
        ;
      }
}