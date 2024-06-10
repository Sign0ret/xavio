"use client";
import { useState } from 'react';
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Spinner from '@/components/components/Spinner'; 
import DynamicTopicsField from '@/components/components/dynamicTopicField';
import { useCurrentUser } from '@/hooks/use-current-user';
import { MemberSchema } from '@/schemas/xavio';

const CourseSchema = z.object({
    courseName: z.string().nonempty("Course name is required"),
    numTopics: z
        .union([z.string(), z.number()])
        .transform((value) => (typeof value === "string" ? parseInt(value, 10) : value))
        .refine((value) => !isNaN(value) && Number.isInteger(value) && value >= 1, {
            message: "At least one topic is required",
        }),
    relevantTopics: z.array(z.string().nonempty("Topic is required")),
    members: z.array(MemberSchema).optional(),
});

export function CreateCourseForm() {
    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    if(!user) return;
    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            courseName: "",
            numTopics: 1,
            relevantTopics: [],
            members: [{"member": user?.id ?? ""}]
        }
    });

    const onSubmit = async (values: z.infer<typeof CourseSchema>) => {
        setError("");
        setSuccess("");
        setIsPending(true);

        try {
            // Call the API to generate the course
            const generateResponse = await axios.post('http://localhost:3000/api/generateCourse', {
                courseName: values.courseName,
                numTopics: values.numTopics,
                relevantTopics: values.relevantTopics,
            });

            if (generateResponse.status !== 200) {
                throw new Error("Failed to generate course");
            }

            const courseData = generateResponse.data;
            
            // Call the API to save the course to MongoDB
            const saveResponse = await axios.post('http://localhost:3000/api/courseAI', courseData);

            if (saveResponse.status !== 200) {
                throw new Error("Failed to save course");
            }
            setSuccess("Course created and saved successfully");
            form.reset();
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            >
                + Create New Course
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-[#18181b] text-white p-6 rounded-lg z-10 max-w-lg w-full relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            X
                        </button>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="space-y-6">
                                    <FormLabel>Create a New Course</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name="courseName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Course Name"
                                                        className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="numTopics"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number of Topics</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Number of Topics"
                                                        type="number"
                                                        className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Controller
                                        name="relevantTopics"
                                        control={form.control}
                                        render={({ field }) => (
                                            <DynamicTopicsField
                                                name={field.name}
                                                control={form.control}
                                                isPending={isPending}
                                            />
                                        )}
                                    />
                                </div>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <div className='w-full flex justify-center'>
                                    {isPending ? (
                                        <Spinner />
                                    ) : (
                                        <button
                                            disabled={isPending}
                                            type="submit"
                                            className="w-3/5 rounded-3xl h-[30px] hover:border-purple-400 border hover:bg-purple-500 border-white focus:border-purple-500"
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </div>
    );
}
