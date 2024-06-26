"use client"
import React, { useState } from 'react';
import { TOption, TOptionA, TQuestion, TQuiz, TSubmit, } from '@/models/Quiz';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    params: {
      course: string,
      topic: string,
      quiz: string,
    };
    quizSubmit: TSubmit;
};

export default function QuizOpen({params, quizSubmit}: Props) {
    const router = useRouter();
    const [submits, setActualQuiz] = useState<TSubmit>(quizSubmit);
    const handleGrade = () => {
      let totalGrade = 0;
    
      submits.answers.forEach(answer => {
        let correctOptions = answer.options.filter(option => option.isCorrect).length;
        let pointsPerOption = answer.points / correctOptions; // Points per correct option
        let questionGrade = 0; // Initialize the grade for this question
    
        answer.options.forEach(option => {
          if (option.isElected) {
            if (option.isCorrect) {
              questionGrade += pointsPerOption; // Add points if correct option is selected
            } else {
              questionGrade -= pointsPerOption; // Subtract points if incorrect option is selected
            }
          }
        });
    
        // Ensure questionGrade doesn't go below 0
        if (questionGrade < 0) {
          questionGrade = 0;
        }
    
        // Assign the calculated grade to the answer object
        answer.points = questionGrade;
    
        // Accumulate the total grade
        totalGrade += questionGrade;
      });
    
      return totalGrade;
    };
    

    
    const handleClose = () => {
      console.log("Closing quiz...");
      const gotGrade: number =  handleGrade()
      setActualQuiz(prevQuiz => {
        console.log("Previous quiz state:", prevQuiz);
        const newQuizState = { ...prevQuiz, open: false, grade: gotGrade};
        console.log("New quiz state:", newQuizState);
        return newQuizState;
      })
    }    
    const handleOptionChange = (qIndex: number, oIndex: number) => {
        setActualQuiz(prevQuiz => {
          const updatedAnswers = prevQuiz.answers.map((answer, aIndex) => {
              if (aIndex === qIndex) {
                  const updatedOptions = answer.options.map((option, index) => {
                      if (index === oIndex) {
                          return { ...option, isElected: !option.isElected }; // Toggle isElected
                      }
                      return option;
                  });
                  return { ...answer, options: updatedOptions };
              }
              return answer;
          });
          return { ...prevQuiz, answers: updatedAnswers };
      });
    };
    const handleOptionRadio = (qIndex: number, oIndex: number) => {
      setActualQuiz(prevQuiz => {
        const updatedAnswers = prevQuiz.answers.map((answer, aIndex) => {
            if (aIndex === qIndex) {
                const updatedOptions = answer.options.map((option, index) => {
                    if (index === oIndex) {
                      return { ...option, isElected: true }; // Toggle isElected
                    } else {
                      return { ...option, isElected: false };
                    }
/*                     return option;
 */                });
                return { ...answer, options: updatedOptions };
            }
            return answer;
        });
        return { ...prevQuiz, answers: updatedAnswers };
    });
  };
    const handleSave = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/quizzes/${params.quiz}/submits/${submits._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submits), // Replace `data` with the object containing the quiz fields to update
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

      const handleRevision = async () => {
        try {
          handleClose(); // Then call handleClose
          await handleSave(); // Call handleSave first
          router.refresh();
        } catch (error: any) {
          // Handle error
          console.error('Failed to revise quiz:', error);
        }
      };
      
    return (
        <div className='max-h-full'>
              {submits.answers.map((question: TQuestion, qIndex: number) => {
                let correctCount: number = 0;
                question.options.forEach((option) => {
                    if (option.isCorrect) {
                        correctCount++;
                    }
                });
                if (correctCount === 1) {
                  return (
                    <section key={question._id} className="relative inset-x-0  mx-auto z-50 max-w-4/5 min-w-[85vw] lg:min-w-[55vw] rounded-md bg-gray-700 p-8 my-4 overflow-y-auto max-h-[80vh]"> 
                      <h3 className="mb-8 text-3xl font-semibold">Question {qIndex+1}</h3>
                        <p className="mb-8 text-lg">{question.question}</p>
                        <div className="space-y-4">
                            <div className="flex flex-col items-left z-100">
                            {question.options?.map((option: TOptionA, oIndex: number) => (
                                <div key={option._id} className='items-center'>
                                <input 
                                    className="h-6 w-6 mr-1" 
                                    id={`option${oIndex}`} 
                                    name={`question${qIndex}`} 
                                    type="radio" 
                                    onChange={() => handleOptionRadio(qIndex, oIndex)} // Call handleOptionChange on change
                                    defaultChecked={option.isElected ? true : false} // Set checked attribute based on option.isElected
                                    // Set checked attribute based on option.isElected
                                />
                                <label className="text-xl" htmlFor={`option${oIndex}`}>
                                    {option.option}
                                </label>
                                </div>
                            ))}
                            </div>
                          </div>
                      </section>
                  )
                } else {
                  return (
                      <section key={question._id} className="relative inset-x-0  mx-auto z-50 max-w-4/5 min-w-[85vw] lg:min-w-[55vw] rounded-md bg-gray-700 p-8 my-4 overflow-y-auto max-h-[80vh]"> 
                      <h3 className="mb-8 text-3xl font-semibold">Question {qIndex+1}</h3>
                        <p className="mb-8 text-lg">{question.question}</p>
                        <div className="space-y-4">
                            <div className="flex flex-col items-left z-100">
                            {question.options?.map((option: TOptionA, oIndex: number) => (
                                <div key={option._id} className='items-center'>
                                <input 
                                    className="h-6 w-6 mr-1" 
                                    id={`option${oIndex}`} 
                                    name={`question${qIndex}`} 
                                    type="checkbox" 
                                    onChange={() => handleOptionChange(qIndex, oIndex)} // Call handleOptionChange on change
                                    defaultChecked={option.isElected} // Set checked attribute based on option.isElected
                                />
                                <label className="text-xl" htmlFor={`option${oIndex}`}>
                                    {option.option}
                                </label>
                                </div>
                            ))}
                            </div>
                          </div>
                      </section>
                  )
                }
              }  
              )}
          <div className='flex flex-row justify-center align-right items-center gap-4 relative inset-x-0 z-50'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={handleSave}
                    variant="secondary"
                    className='w-[25%] my-5 py-5'
                  >
                      Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to save your progress</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={handleRevision}
                    variant="default"
                    className='w-[25%] my-5 py-5'
                  >
                      Submit
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to end the quizz</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
           
          </div>
        </div>
      );
}
