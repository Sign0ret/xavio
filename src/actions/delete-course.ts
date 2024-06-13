"use server"

import { currentUser } from "@/lib/auth";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
export async function deleteCourse(formData: FormData) {
    const user = await currentUser();
    const id = formData.get("id")?.toString();
    const course = formData.get("course")?.toString();
    if ((!course) || !user ){
        return;
    }
    try {
        const get = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!get.ok) {
            throw new Error('Failed to fetch course');
          }
        const courseGot = await get.json();
        if(courseGot.course.toString() === course.toString()) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              throw new Error('Failed to fetch course');
            }
        }
      } catch (error: any) {
        ;
      }
      revalidatePath('/s/courses/chat') // Update cached posts
      redirect(`/s/courses/chat`) // Navigate to the new post page
}