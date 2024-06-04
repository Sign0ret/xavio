"use client";

import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CourseSchema, TareasSchema } from "@/schemas/xavio";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { TextIcon, MessageCircleIcon, PencilIcon, XIcon, UploadIcon, FileIcon} from '@/components/icons';
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { login } from "@/actions/login";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";


export function PostCourse() {
    const router = useRouter();
    const user = useCurrentUser();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
    ? "Email already in use with different provider!" 
    : "";
    
    const form = useForm<z.infer<typeof CourseSchema>>({
      resolver: zodResolver(CourseSchema),
      defaultValues: {
        course: "",
        description: "",
        members: [{"member": user?.id ?? "", "admin": true}] // Ensure to provide default value for member ID
      }
    })
    
    if(!user) {
      return;
    }
  const onSubmit = async (values: z.infer<typeof CourseSchema>) => {
    setError("");
    setSuccess("");
  
    startTransition(() => {
      async function submitData() {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
  
          if (!res.ok) {
            throw new Error('Failed to fetch course');
          }
  
          await res.json();
          router.refresh();
        } catch (error) {
          console.error('Error:', error);
          // Handle error here
        }
      }
  
      submitData();
    });
  };
  
  return (
          <Form {...form}>
              <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
              >
                  <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Course"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Description"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>
                  <FormError message={error || urlError} />
                  <FormSuccess message={success} />
                  <Button
                      disabled={isPending}
                      type="submit"
                      className="w-full"
                  >
                      {showTwoFactor ? "Confirm" : "Submit"} 
                  </Button>
              </form>
          </Form>    
  )
}