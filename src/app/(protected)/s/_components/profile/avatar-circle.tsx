"use client";
import { AnimatedTooltipProfile } from "@/components/ui/animated-tooltip-profile";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from '@/lib/auth';
import React from "react";

//const user = await currentUser();

export function AnimatedTooltipPreview() {
  const user = useCurrentUser();
  const people = [
    {
      id: 1,
      name: "Jorge Blásquez",
      designation: "Software Engineer",
      image:
        "/profile_photo2.jpeg",
    }
  ];
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltipProfile items={people} />
    </div>
  );
}
