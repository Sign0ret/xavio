"use client";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CourseSchema, SubscribeSchema, TareasSchema } from "@/schemas/xavio";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { TextIcon, MessageCircleIcon, PencilIcon, XIcon, UploadIcon, FileIcon } from '@/components/icons';
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
import { DialogTitle } from "@/components/ui/dialog";
import Spinner from "@/components/components/Spinner";

type PostCourseProps = {
  onSuccess: () => void; // Callback function to notify parent on success
};

export function PostCourse({ onSuccess }: PostCourseProps) {
    const router = useRouter();
    const user = useCurrentUser();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    // Separate state for each form
    const [createError, setCreateError] = useState<string | undefined>("");
    const [createSuccess, setCreateSuccess] = useState<string | undefined>("");
    const [subscribeError, setSubscribeError] = useState<string | undefined>("");
    const [subscribeSuccess, setSubscribeSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
        ? "Email already in use with different provider!" 
        : "";
    
    const formCreate = useForm<z.infer<typeof CourseSchema>>({
      resolver: zodResolver(CourseSchema),
      defaultValues: {
        course: "",
        password: "",
        description: "",
        members: [{"member": user?.id ?? "", "admin": true}] // Ensure to provide default value for member ID
      }
    });

    const formSubscribe = useForm<z.infer<typeof SubscribeSchema>>({
      resolver: zodResolver(SubscribeSchema),
      defaultValues: {
        id: "",
        password: "",
      }
    });
    
    if (!user) {
      return null;
    }

    const onSubmit = async (values: z.infer<typeof CourseSchema>) => {
        const validatedFields = CourseSchema.safeParse(values);
        if (!validatedFields.success) {
            return setCreateError("Invalid fields!");
        }
        const { course, password, description, members } = validatedFields.data;
        const sendData = {
            course,
            password: password.toString(),
            description,
            members
        };
        console.log("sendData:", sendData);
        setCreateError("");
        setCreateSuccess("");

        startTransition(() => {
            async function submitData() {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(sendData),
                    });

                    if (!res.ok) {
                        throw new Error('Failed to create course');
                    }
                    setCreateSuccess("Course created and saved successfully");
                    onSuccess(); //callback to update the courses layout 
                    await res.json();
                    router.refresh();
                } catch (error: any) {
                    setCreateError(error.message);
                }
            }

            submitData();
        });
    };

    const onSubscribe = async (values: z.infer<typeof SubscribeSchema>) => {
        console.log("entro")
        console.log("Attempting to subscribe");
        const validatedFields = SubscribeSchema.safeParse(values);
        if (!validatedFields.success) {
            return setSubscribeError("Invalid fields!");
        }
        const { id, password } = validatedFields.data;
        setSubscribeError("");
        setSubscribeSuccess("");
        const newMember = {
            "member": user.id,
            "admin": false
        };
        console.log("newMember:", newMember);
        startTransition(() => {
            async function submitData() {
                try {
                    const getCoursePassword = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}/coursepassword`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const coursePassword = await getCoursePassword.json();
                    console.log("coursePassword:",coursePassword)
                    if (coursePassword.password && coursePassword.password.toString() === password.toString()) {
                        const send = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}/members`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newMember),
                        });
                        if (!send.ok) {
                            throw new Error('Failed to fetch course');
                        }
                        setSubscribeSuccess("Successfully subscribed to course");
                        onSuccess(); //callback to update the courses layout 
                        router.refresh();
                    } else {
                        setSubscribeError("Wrong password");
                    }
                } catch (error: any) {
                    setSubscribeError(error.message);
                }
            }
            submitData();
        });
    };
  
    return (
        <>
            <Form {...formCreate}>
                <form 
                    onSubmit={formCreate.handleSubmit(onSubmit)}
                    className="space-y-6 bg-[#18181b] text-white border-b pb-7"
                    >
                    <div className="space-y-6">
                    <FormField 
                            control={formCreate.control}
                            name="course"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Course"
                                            className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={formCreate.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="********"
                                            className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={formCreate.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Description"
                                            className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={createError || urlError} />
                    <FormSuccess message={createSuccess} />
                    <div className='w-full flex justify-center'>
                        {isPending ? (
                            <Spinner /> // Render the spinner when isPending is true
                        ) : (
                            <button
                                disabled={isPending}
                                type="submit"
                                className="w-3/5 rounded-3xl h-[30px] hover:border-purple-400 border hover:bg-purple-500 border-white focus:border-purple-500"
                            >
                                {showTwoFactor ? "Confirm" : "Submit"} 
                            </button>
                        )}
                    </div>
                </form>
            </Form>   
            <DialogTitle className="pt-10 pb-2 text-white">Subscribe to existing course</DialogTitle>
            <Form {...formSubscribe}>
                <form 
                    onSubmit={formSubscribe.handleSubmit(onSubscribe)}
                    className="space-y-6 bg-[#18181b] text-white"
                >
                    <div className="space-y-6">
                        <FormField 
                            control={formSubscribe.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="id"
                                            className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={formSubscribe.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="********"
                                            className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={subscribeError || urlError} />
                    <FormSuccess message={subscribeSuccess} />
                    <div className='w-full flex justify-center'>
                        {isPending ? (
                            <Spinner /> // Render the spinner when isPending is true
                        ) : (
                            <button
                                disabled={isPending}
                                type="submit"
                                className="w-3/5 rounded-3xl h-[30px] hover:border-purple-400 border hover:bg-purple-500 border-white focus:border-purple-500"
                            >
                                {showTwoFactor ? "Confirm" : "Submit"} 
                            </button>
                        )}
                    </div>
                </form>
            </Form>     
        </>
    );
}
