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
    <div>
      <BackgroundGradient className="rounded-[22px] lg:min-w-sm min-h-[300px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {quizDescription.topic}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {quizDescription.description}
        </p>
        
      </BackgroundGradient>
      <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Retroalimentacion y solucion </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button>
    </div>
  );
}
