"use client";

import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TareasSchema } from "@/schemas/xavio";
import { useSearchParams } from "next/navigation";
import { TTopic } from "@/models/Topic";
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { TextIcon, MessageCircleIcon, PencilIcon, XIcon, UploadIcon, FileIcon} from '@/components/icons';

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
import axios from 'axios';
import { login } from "@/actions/login";
import Link from "next/link";
import Spinner from "@/components/components/Spinner";

type Props = {
    params: {
      course: string;
    },
    topics: TTopic[],
    onSuccess: () => void // Callback function to notify parent on success
  };

export function PostSubject({ params ,topics, onSuccess}: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
      ? "Email already in use with different provider!" 
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("")
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof TareasSchema>>({
      resolver: zodResolver(TareasSchema),
      defaultValues: {
          title: "",
          difficulty: "",
      }
  })

  const onSubmit = async (values: z.infer<typeof TareasSchema>) => {
      setError("");
      setSuccess("");
      setIsPending(true);
      /* startTransition(() => {
          login(values, callbackUrl)
              .then((data) => {
                  if (data?.error) {
                      form.reset();
                      setError(data.error);
                  }
                  if (data?.success) {
                      form.reset();
                      setSuccess(data.success);
                  }
                  if (data?.twoFactor) {
                      setShowTwoFactor(true);
                  }
              })
              .catch(() => setError("Something went wrong"));
      }) */
      try {
        // Call the API to generate the quiz
        const response = await axios.post('http://localhost:3000/api/generateTask', {
            topic: values.title,
            difficulty: values.difficulty,
        });

        if (response.status !== 200) {
            throw new Error("Failed to generate Task");
        }

        const taskData = response.data;

        // Call the API to save the quiz to MongoDB
        const saveResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${values.topic}/tasks`, taskData);

        if (saveResponse.status !== 200) {
            throw new Error("Failed to save Task");
        }

        setSuccess("Task created and saved successfully");
        onSuccess(); //callback to update the course page
        form.reset();
    } catch (error: any) {
        setError(error.message);
    } finally {
        setIsPending(false);
    }
  }
  return (
          <Form {...form}>
              <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 bg-[#18181b] text-white"
              >
                  <div className="space-y-4">
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
                                <FormLabel>Description</FormLabel>
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
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Topic     </FormLabel>
                                <FormControl>
                                    <select {...field} disabled={isPending} className='h-30px rounded-full hover:border-purple-500   focus:border-purple-500'>
                                        <option value="" className='h-30px rounded-full hover:border-purple-500   focus:border-purple-500'>Select a topic...</option>
                                        {topics.map((topic) => (
                                            <option key={topic._id} value={topic._id} className='h-30px rounded-full hover:border-purple-500   focus:border-purple-500'>
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
  )
}