import React from 'react';
import { Metadata } from 'next';
import { TOption, TQuestion } from '@/models/Quiz';
import { Button } from '@/components/ui/button';


type Props = {
  params: { 
    course: string,
    topic: string,
    quiz: string,
 }
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Quiz de ${params.quiz}`
  }
}
  
export default async function QuizDoing( { params }: Props) {
  const fetchQuiz = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/quizzes/${params.quiz}`);
    const quiz = await res.json();
    console.log("quiz:", quiz);
    return quiz;
  }
  const quizInfo = await fetchQuiz();
  return (
    <div className='max-h-[84vh] overflow-y-auto pb-20'>
      <h2 className="mb-4 text-4xl font-bold text-white">{quizInfo.quiz}</h2>
          {quizInfo.structure.map((question:TQuestion, qIndex:number) => (
              <section key={question._id} className="relative inset-x-0  mx-auto z-50 w-full min-w-[85vw] lg:min-w-[55vw] rounded-md bg-gray-200 p-8 my-4 overflow-y-auto max-h-[80vh]"> 
              <h3 className="mb-8 text-3xl font-semibold">Question {qIndex+1}</h3>
                <p className="mb-8 text-lg">{question.question}</p>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 z-100">
                    {question.options?.map((option:TOption, oIndex) => (
                        <>
                        <input className="h-6 w-6" id={`option${oIndex}`} name={`question${qIndex}`} type="radio" />
                        <label className="text-xl" htmlFor="option1">
                            {option.option}
                        </label>
                        </>
                    ))}
                    </div>
                  </div>
              </section>
          ))}
      <Button 
        className="relative inset-x-0  mx-auto z-50 hover:bg-zinc-700 transition-colors duration-300"
        type="submit"
      >
          Submit
      </Button>
    </div>
  );
}