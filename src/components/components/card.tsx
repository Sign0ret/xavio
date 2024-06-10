"use client";
import { CreateCourseForm } from "@/app/(protected)/s/courses/chat/_components/forms/post-courseAI";
import { HoverEffect2 } from "@/components/ui/card-hover-effect-2";
import { TCourse } from "@/models/Course";
interface CardProps {
  courses: TCourse[];
}
export function Card({ courses }: CardProps) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect2 items={courses} />
      <div className="flex justify-center pb-4">
        <CreateCourseForm/>
      </div>
    </div>
  );
}
