"use client";
import { TCourse } from "@/models/Course";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect2 = ({
  items,
  className,
  onSubscribe,
  userId
}: {
  items: TCourse[];
  className?: string;
  onSubscribe: (courseId: string) => void;
  userId: string | null;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10",
        className
      )}
    >
      
      {items.map((item, idx) => {
        const isMember = userId && item.members.some(member => member.member === userId);

        return (
          <div key={item._id} className="relative group block p-2 h-full w-full">
            {isMember ? (
              <Link
                href={`/s/courses/${item._id}/topics`}
                className="block"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-white block rounded-3xl bg-opacity-10"
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
                <Card className="flex flex-col items-center justify-center p-4">
                  <CardTitle>{item.course}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </Card>
              </Link>
            ) : (
              <Card className="flex flex-col items-center justify-center p-4">
                <CardTitle>{item.course}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <button
                  onClick={() => onSubscribe(item._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full mt-4"
                >
                  Subscribe
                </button>
              </Card>
            )}
          </div>
        );
      })}
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
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-zinc-900 border dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
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
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
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
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
