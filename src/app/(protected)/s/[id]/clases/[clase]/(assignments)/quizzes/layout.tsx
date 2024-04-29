import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { QuizDescriptionCard } from "../_components/quiz_description_card";


const quizDescription = {
    topic: "Algebra",
    description: "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.",
    lastUpdated: "2024-03-30T10:20:00",
    contributor: "adolfo"
}
  

export default function QuizClaseLayout({
    children,
    params, // will be a page or nested layout
  }: {
    children: React.ReactNode,
    params: { 
        id: string,
        clase: string,
        quiz: string,
    }
  }) {
    return (
        <div key="1" className="flex h-screen w-full">
            <div className="flex w-2/5 flex-col items-start justify-start space-y-2 p-4">
                <QuizDescriptionCard quizDescription={quizDescription} params={params}/>
            </div>
            <div className="flex w-3/5 flex-col items-center justify-center bg-white p-8">
                {children}
            </div>
        </div>
    )
}
function ChevronsUpDownIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    )
  }