"use client";
import { CreateCourseForm } from "@/app/(protected)/s/courses/chat/_components/forms/post-courseAI";
import { HoverEffect2 } from "@/components/ui/card-hover-effect-2";
import { TCourse } from "@/models/Course";

interface CardProps {
  courses: TCourse[];
  onSubscribe: (courseId: string) => void;
  userId: string | null;
}

export function Card({ courses, onSubscribe, userId }: CardProps) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect2 items={courses} onSubscribe={onSubscribe} userId={userId} />
      <div className="flex justify-center pb-4">
        <CreateCourseForm />
      </div>
    </div>
  );
}
