import { QuizSideCard } from "@/app/(protected)/s/_components/quiz/quiz-sidecard"
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

export default async function QuizClaseLayout({
    children,
    params, // will be a page or nested layout
  }: {
    children: React.ReactNode,
    params: { 
        course: string,
        topic: string,
        quiz: string,
    }
  }) {
    try {
        const fetchQuiz = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/quizzes/${params.quiz}`);
        const quiz = await res.json();
        return quiz;
      }
    
      const quizDescription = await fetchQuiz();
      console.log(quizDescription)
      return (
        <div>
          {/* Large */}
          <div key="1" className="hidden lg:flex">
              <div className="flex w-2/5 flex-col items-start justify-start space-y-2 p-4 relative inset-x-0 max-w-2xl mx-auto z-50">
                  <QuizSideCard quizDescription={quizDescription} params={params}/>
              </div>
              <div className="flex w-3/5 flex-col items-center justify-center p-8">
                  {children}
              </div>
          </div>
          {/* Mobil */}
          <div className="lg:hidden flex w-full flex-col items-center justify-center p-8 relative inset-x-0 max-w-2xl mx-auto z-50">
              <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="default" className="bg-zinc-700 text-white hover:bg-zinc-700 transition-colors duration-300 bg-opacity-50">Instrucciones | {params.quiz}</Button>
                  </DrawerTrigger>
                  <DrawerContent className='max-h-[vh-80] overflow-y-hidden bg-zinc-700 border-zinc-700'>
                      <DrawerDescription>
                        <QuizSideCard quizDescription={quizDescription} params={params}/>
                      </DrawerDescription>
                  </DrawerContent>
              </Drawer>
              <div>
                  {children}
              </div>
          </div>
        </div>
          
      )
    } catch (err: any) {
      return (
        <div>
          Error Fetching Quiz
        </div>
      )
    }
}