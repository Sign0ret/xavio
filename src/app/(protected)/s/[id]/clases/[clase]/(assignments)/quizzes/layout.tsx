import { QuizDescriptionCard } from "../_components/quiz_description_card";
import { ChevronsUpDownIcon } from "@/components/icons";
import { TareaDescriptionCard } from "../_components/tarea_description_card";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

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
      <div className="h-screen w-full">
        <div key="1" className="hidden lg:flex">
            <div className="flex w-2/5 flex-col items-start justify-start space-y-2 p-4">
                <QuizDescriptionCard quizDescription={quizDescription} params={params}/>
            </div>
            <div className="flex w-3/5 flex-col items-center justify-center bg-white p-8">
                {children}
            </div>
        </div>
        <div className="lg:hidden flex w-full flex-col items-center justify-center bg-white p-8">
            <Drawer>
                <DrawerTrigger>
                    <Button className="w-9 flex flex-row" size="sm" variant="ghost">
                        <ChevronsUpDownIcon className="h-4 w-4" />
                        <h4 className="text-sm font-semibold">Tarea | {params.clase}</h4>
                        <span className="sr-only">Toggle</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent className='max-h-screen overflow-y-auto'>
                    <DrawerHeader>
                    <DrawerTitle>Quiz | {params.clase}</DrawerTitle>
                    <DrawerDescription>
                      <QuizDescriptionCard quizDescription={quizDescription} params={params}/>
                    </DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <div>
                {children}
            </div>
        </div>
      </div>
        
    )
}