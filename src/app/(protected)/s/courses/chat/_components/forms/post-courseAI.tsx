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

const CourseSchema = z.object({
    courseName: z.string().nonempty("Course name is required"),
    numTopics: z
        .union([z.string(), z.number()])
        .transform((value) => (typeof value === "string" ? parseInt(value, 10) : value))
        .refine((value) => !isNaN(value) && Number.isInteger(value) && value >= 1, {
            message: "At least one topic is required",
        }),
    relevantTopics: z.array(z.string().nonempty("Topic is required")),
});

export function CreateCourseForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            courseName: "",
            numTopics: 1,
            relevantTopics: [],
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 bg-[#18181b] text-white"
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
    );
}