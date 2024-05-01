"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

type Props = {
  params: {
    id: string;
    clase: string;
    quiz: string;
  };
  quizDescription: {
    topic: string,
    description: string,
    lastUpdated: string,
    contributor: string,
  };
};

export function QuizDescriptionCard({ params, quizDescription }: Props) {
  return (
    <section className="w-full lg:min-w-[700px] rounded-md bg-zinc-700 p-8 my-4 overflow-y-auto max-h-[80vh] text-white"> 
      <h3 className="mb-8 text-3xl font-semibold">Quiz {quizDescription.topic}</h3>
        <div className="space-y-4">
            <p>{quizDescription.description}</p>
        </div>
    </section>
  );
}
