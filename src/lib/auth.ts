import { auth } from "@/auth";
import { getSession } from "next-auth/react";


export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};

export const currentUser2 = async () => {
    try {
      const session = await getSession();
      return session?.user ?? null;
    } catch (error) {
      console.error("Error fetching current user session:", error);
      return null;
    }
  };

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
};