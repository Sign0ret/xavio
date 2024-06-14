"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Adolfo",
    designation: "Software Engineer",
    image: "/foto_foter_adolf.jpeg",
  },
  {
    id: 2,
    name: "Jorge",
    designation: "Software Engineer",
    image: "/foto_foter_jj.jpeg",
  },
  {
    id: 3,
    name: "Arturo",
    designation: "Software Engineer",
    image: "/foto_foter_artur.jpg",
  },
  {
    id: 4,
    name: "Carlos",
    designation: "Software Engineer",
    image: "/foto_foter_carlos.jpeg",
  },
  {
    id: 5,
    name: "Bryan",
    designation: "Software Engineer",
    image: "/foto_foter_bryan.jpeg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
