"use client";

import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizzSchema } from "@/schemas/xavio";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { XIcon, UploadIcon, FileIcon } from '@/components/icons';
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
import Link from "next/link";
import { TTopic } from "@/models/Topic";

type Props = {
    params: {
      course: string;
    },
/*     topics: TTopic[] | null; */
};

export function PostQuiz({ params}: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
      ? "Email already in use with different provider!" 
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof QuizzSchema>>({
      resolver: zodResolver(QuizzSchema),
      defaultValues: {
          title: "",
          difficulty: "",
          numQuestions: "",
      }
  });

  const onSubmit = async (values: z.infer<typeof QuizzSchema>) => {
    setError("");
    setSuccess("");

    try {
        // Call the API to generate the quiz
        const response = await fetch('http://localhost:3000/api/generateQuizz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: values.title,
                numQuestions: values.numQuestions,
                difficulty: values.difficulty,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate quiz");
        }

        const quizData = await response.json();
        console.log("gg", quizData);
        // Call the API to save the quiz to MongoDB
        const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/665e6fb0e3c2f87ecc4443c1/quizzes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData),
        });

        if (!saveResponse.ok) {
            throw new Error("Failed to save quiz");
        }

        setSuccess("Quiz created and saved successfully");
        form.reset();
    } catch (error: any) {
        setError(error.message);
    }
};

  return (
          <Form {...form}>
              <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
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
  );
}
