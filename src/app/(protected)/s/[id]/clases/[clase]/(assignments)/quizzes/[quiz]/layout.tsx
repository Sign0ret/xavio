import { QuizSideCard} from "../../_components/quiz/quiz_sidecard";
import { ChevronsUpDownIcon } from "@/components/icons";
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
      <div className="h-screen w-full pt-20 bg-zinc-900">
        <div key="1" className="hidden lg:flex">
            <div className="flex w-2/5 flex-col items-start justify-start space-y-2 p-4 relative inset-x-0 max-w-2xl mx-auto z-50">
                <QuizSideCard quizDescription={quizDescription} params={params}/>
            </div>
            <div className="flex w-3/5 flex-col items-center justify-center p-8">
                {children}
            </div>
        </div>
        <div className="lg:hidden flex w-full flex-col items-center justify-center p-8">
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
                    <DrawerDescription>
                      <QuizSideCard quizDescription={quizDescription} params={params}/>
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