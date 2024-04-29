import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import Link from "next/link"


const topicsInfo = [
    {
      topic: "Algebra",
      description: "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.",
      lastUpdated: "2024-03-30T10:20:00",
      contributor: "adolfo"
    },
    {
      topic: "Geometry",
      description: "Geometry is a branch of mathematics concerned with questions of shape, size, relative position of figures, and the properties of space.",
      lastUpdated: "2024-03-30T10:20:00",
      contributor: "User"
    },
    {
      topic: "Calculus",
      description: "Calculus is the mathematical study of continuous change, in the same way that geometry is the study of shape and algebra is the study of generalizations of arithmetic operations.",
      lastUpdated: "2024-03-30T10:20:00",
      contributor: "John Doe"
    },
    {
      topic: "Statistics",
      description: "Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data.",
      lastUpdated: "2024-03-30T10:20:00",
      contributor: "adolfo"
    }
  ];
  

export default function TemaClaseLayout({
    children,
    params, // will be a page or nested layout
  }: {
    children: React.ReactNode,
    params: { 
        id: string,
        clase: string,
        tema: string,
    }
  }) {
    return (
        <div key="1" className="flex h-screen w-full">
            <div className="flex w-1/5 flex-col items-start justify-start space-y-2 p-4">
                <Collapsible className="w-[350px] space-y-2">
                <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">Temas | {params.clase}</h4>
                    <CollapsibleTrigger asChild>
                    <Button className="w-9 p-0" size="sm" variant="ghost">
                        <ChevronsUpDownIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                    </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">{topicsInfo[0].topic}</div>
                <CollapsibleContent className="space-y-2">
                    {topicsInfo.map((topic, index) => (
                        <Link href={`/s/${params.id}/clases/${params.clase}}/temas/${topic.topic}`}>
                            <div key={topic.topic} className="rounded-md border px-4 py-3 my-2 font-mono text-sm">{topic.topic}</div>
                        </Link>
                    ))}
                </CollapsibleContent>
                </Collapsible>
            </div>
            <div className="flex w-4/5 flex-col items-center justify-center bg-white p-8">
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