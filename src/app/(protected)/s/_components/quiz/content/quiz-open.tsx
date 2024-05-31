"use client"
import React, { useState } from 'react';
import { TOption, TQuestion, TQuiz, TSubmit, } from '@/models/Quiz';
import { Button } from '@/components/ui/button';

type Props = {
    params: {
      course: string,
      topic: string,
      quiz: string,
    };
    quizSubmit: TSubmit;
};

export default function QuizOpen({params, quizSubmit}: Props) {
    const [actualQuiz, setActualQuiz] = useState<TSubmit>(quizSubmit);
    const handleOptionChange = (qIndex: number, oIndex: number) => {
        setActualQuiz(prevQuiz => {
            const updatedAnswers = [...prevQuiz.answers];
            updatedAnswers[qIndex].options.forEach((option, index) => {
                if (index === oIndex) {
                    option.isElected = true; // Toggle isSelected
                } else {
                    option.isElected = false; // Unselect other options
                }
            });
            return { ...prevQuiz, answers: updatedAnswers };
        });
    };
    const handleSave = async () => {
        try {
            console.log("hola si me escribo:",actualQuiz);
            const submitData = {
                submits: { actualQuiz }
              };  
          const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/quizzes/${params.quiz}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData), // Replace `data` with the object containing the quiz fields to update
          });
          if (!res.ok) {
            throw new Error('Failed to fetch course');
          }
          const quiz = await res.json();
          console.log("savedQuiz",quiz)
        } catch (error: any) {
          ;
        }
      };

    return (
        <div className='max-h-[84vh] overflow-y-auto pb-20'>
              {actualQuiz.answers.map((question: TQuestion, qIndex: number) => (
                  <section key={question._id} className="relative inset-x-0  mx-auto z-50 w-full min-w-[85vw] lg:min-w-[55vw] rounded-md bg-gray-200 p-8 my-4 overflow-y-auto max-h-[80vh]"> 
                  <h3 className="mb-8 text-3xl font-semibold">Question {qIndex+1}</h3>
                    <p className="mb-8 text-lg">{question.question}</p>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 z-100">
                        {question.options?.map((option: TOption, oIndex: number) => (
                            <>
                            <input 
                                className="h-6 w-6" 
                                id={`option${oIndex}`} 
                                name={`question${qIndex}`} 
                                type="radio" 
                                onChange={() => handleOptionChange(qIndex, oIndex)} // Call handleOptionChange on change
                            />
                            <label className="text-xl" htmlFor={`option${oIndex}`}>
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
            onClick={handleSave}
          >
              Submit
          </Button>
        </div>
      );
}
