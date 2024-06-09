"use client";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CourseSchema, TareasSchema } from "@/schemas/xavio";
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

    const formSubscribe = useForm<z.infer<typeof CourseSchema>>({
      resolver: zodResolver(CourseSchema),
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const sendData = {
            course,
            password: hashedPassword,
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

    const onSubscribe = async (values: z.infer<typeof CourseSchema>) => {
        console.log("entro")
        console.log("Attempting to subscribe");
        const validatedFields = CourseSchema.safeParse(values);
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
                    router.refresh();
                    setSubscribeSuccess("Successfully subscribed to course");
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
                    className="space-y-4"
                >
                    <div className="space-y-4">
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
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={createError || urlError} />
                    <FormSuccess message={createSuccess} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {showTwoFactor ? "Confirm" : "Submit"} 
                    </Button>
                </form>
            </Form>   
            <DialogTitle className="pt-10 pb-2 text-black">Subscribe to existing course</DialogTitle>
            <Form {...formSubscribe}>
                <form 
                    onSubmit={formSubscribe.handleSubmit(onSubscribe)}
                    className="space-y-4"
                >
                    <div className="space-y-4">
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={subscribeError || urlError} />
                    <FormSuccess message={subscribeSuccess} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {showTwoFactor ? "Confirm" : "Submit"} 
                    </Button>
                </form>
            </Form>     
        </>
    );
}
