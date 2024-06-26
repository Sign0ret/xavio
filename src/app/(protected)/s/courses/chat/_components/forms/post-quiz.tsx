import { useEffect, useState } from 'react';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizzSchema } from "@/schemas/xavio";
import { useSearchParams } from "next/navigation";
import { TTopic } from "@/models/Topic";
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

type Props = {
    params: {
        course: string;
    },
    topics: TTopic[],
    onSuccess: () => void // Callback function to notify parent on success
};

export function PostQuiz({ params, topics, onSuccess }: Props) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof QuizzSchema>>({
        resolver: zodResolver(QuizzSchema),
        defaultValues: {
            title: "",
            difficulty: "",
            numQuestions: "",
            topic: "", // Added for form control
        }
    });

    const onSubmit = async (values: z.infer<typeof QuizzSchema>) => {
        setError("");
        setSuccess("");
        setIsPending(true);

        try {
            // Find the selected topic based on the topic ID
            const selectedTopic = topics.find(topic => topic._id === values.topic);

            if (!selectedTopic) {
                throw new Error("Selected topic not found");
            }

            console.log("nameQuizz:", values.title);
            console.log("topic:", selectedTopic.topic);

            // Call the API to generate the quiz
            const response = await axios.post('http://localhost:3000/api/generateQuizz', {
                nameQuizz: values.title, // Pass the topic name
                topic: selectedTopic.topic,
                numQuestions: values.numQuestions,
                difficulty: values.difficulty,
            });

            if (response.status !== 200) {
                throw new Error("Failed to generate quiz");
            }

            const quizData = response.data;

            // Call the API to save the quiz to MongoDB
            const saveResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${values.topic}/quizzes`, quizData);

            if (saveResponse.status !== 200) {
                throw new Error("Failed to save quiz");
            }
            setSuccess("Quiz created and saved successfully");
            onSuccess(); //callback to update the course page
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
                    <FormLabel>Resources to generate Quiz</FormLabel>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Title"
                                        className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Difficulty of the Quiz</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Difficulty"
                                        className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="numQuestions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of questions of the Quiz</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Number of Questions"
                                        type="number"
                                        max={10}
                                        className='rounded-full hover:border-purple-500 focus:border-purple-500'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Topic</FormLabel>
                                <FormControl>
                                    <select {...field} disabled={isPending} className='h-30px rounded-full hover:border-purple-500 focus:border-purple-500'>
                                        <option value="" className='h-30px rounded-full hover:border-purple-500 focus:border-purple-500'>Select a topic...</option>
                                        {topics.map((topic) => (
                                            <option key={topic._id} value={topic._id} className='h-30px rounded-full hover:border-purple-500 focus:border-purple-500'>
                                                {topic.topic}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <div className='w-full flex justify-center'>
                    {isPending ? (
                        <Spinner /> // Render the spinner when isPending is true
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
