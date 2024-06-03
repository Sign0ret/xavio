"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TSubmit } from "@/models/Quiz";

type Props = {
    params: { 
        course: string,
        topic: string,
        quiz: string,
    },
    quizSubmit: TSubmit,
};

export function QuizCheck({ params, quizSubmit}: Props) {
    return (
        <div className='max-h-full pb-20'>
            
            {quizSubmit.answers.map((question, qIndex) => {
                let points: number = question.points / question.options.length
                let qGrade: number = 0;
                question.options.forEach(option => { 
                    if (option.isElected) {
                        if (option.isCorrect) {
                            qGrade += points; // Add points if the option is selected
                        } else {
                            qGrade -= points; // Add points if the option is selected
                        }
                      } else {
                        if (option.isCorrect) {
                            qGrade -= points; // Add points if the option is selected
                        } else {
                            qGrade += points; // Add points if the option is selected
                        }
                      }
                })
                return (
                    <section key={question._id} className="relative inset-x-0  mx-auto z-50 w-full min-w-[85vw] lg:min-w-[20vw] rounded-md bg-gray-700 p-8 my-4 overflow-y-auto max-h-[80vh]"> 
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="mb-8 text-3xl font-semibold">Question {qIndex+1}</h3>
                        <Badge className="bg-zinc-900 mb-8 text-2xl font-semibold text-gray-200">{qGrade}/{question.points}</Badge>
                    </div>
                        <p className="mb-8 text-lg">{question.question}</p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 z-100">
                            {question.options?.map((option, oIndex) => (
                                <>
                                <input className="h-6 w-6" id={`option${oIndex}`} name={`question${qIndex}`} type="checkbox" checked={option.isElected} disabled />
                                <label className="text-xl" htmlFor="option1">
                                    {option.option}
                                </label>
                                {option.isElected && option.isCorrect && <p className="text-green-500">+{points}</p>}
                                {option.isElected && !option.isCorrect && <p className="text-red-500">-{points}</p>}
                                {!option.isElected && option.isCorrect && <p className="text-red-500">-{points}</p>}
                                {!option.isElected && !option.isCorrect && <p className="text-green-500">+{points}</p>}
                                </>
                            ))}
                            </div>
                        </div>
                    </section>
                )
            } 
            )}
        </div>
    );
}
