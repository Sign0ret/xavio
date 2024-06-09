"use server"

import { currentUser } from "@/lib/auth";

export async function deleteMember(formData: FormData) {
    const user = await currentUser();
    const member = formData.get("member")?.toString();
    const course = formData.get("course")?.toString();
    if ((!member) || !course ){
        return;
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${course}/members/${member}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
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