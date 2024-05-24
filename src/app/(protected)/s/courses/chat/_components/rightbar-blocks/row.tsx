import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { 
  TextIcon,
  FileQuestionIcon,
  CheckIcon,
  BookIcon,
  ClipboardIcon,
  BookOpenIcon,
} from '@/components/icons';
import { IContent, TContent } from "@/models/Topic";
import { ITask, TTask } from "@/models/Task";
import { IQuiz, TQuiz } from "@/models/Quiz";

export const RowContent = ({
  params,
  items,
  topic,
  className,
}: {
  params: {
    course: string,
  }
  items: TContent[];
  topic: string,
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [value, setValue] = React.useState('tareas');

  return (
    <div
      className={cn(
        "row py-1",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/s/courses/${params.course}/topics/${topic}/content/${item._id}`}
          key={item?._id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="flex flex-row">
              <span className="w-4 h-4 mt-1">
                <BookOpenIcon className="w-4 h-4" />
              </span>
              <p className="ml-2">
                {item.url}
              </p>
            </CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};


export const RowTask = ({
  params,
  items,
  topic,
  className,
}: {
  params: {
    course: string,
  }
  items: TTask[];
  topic: string,
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [value, setValue] = React.useState('tareas');

  return (
    <div
      className={cn(
        "row py-1",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/s/courses/${params.course}/topics/${topic}/tasks/${item._id}`}
          key={item?._id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="flex flex-row">
              <span className="w-4 h-4 mt-1">
                <ClipboardIcon className="w-4 h-4" />
              </span>
              <p className="ml-2">
                {item.task}
              </p>
            </CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};


export const RowQuizz = ({
  params,
  items,
  topic,
  className,
}: {
  params: {
    course: string,
  }
  items: TQuiz[];
  topic: string,
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [value, setValue] = React.useState('tareas');

  return (
    <div
      className={cn(
        "row py-1",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/s/courses/${params.course}/topics/${topic}/quizzes/${item._id}`}
          key={item?._id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="flex flex-row">
              <span className="w-4 h-4 mt-1">
                <FileQuestionIcon className="w-4 h-4" />
              </span>
              <p className="ml-2">
                {item.quiz}
              </p>
            </CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-10">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
        