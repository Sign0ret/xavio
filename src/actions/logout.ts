"use server"

import { signOut } from "@/auth"
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
export const logout = async () => {
    // Some server stuff before logout the user
    await signOut();
    revalidatePath('/') // Update cached posts
    redirect(`/`) // Navigate to the new post page
}