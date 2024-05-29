'use client'
import React, { use, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { 
  FileQuestionIcon,
  CheckIcon,
  ClipboardIcon,
  BookOpenIcon,
} from '@/components/icons';
import QuizDescription from './sidebar/quiz-description';
import QuizDoing from './sidebar/quiz-doing';
import QuizRevision from './sidebar/quiz-revision';
import QuizCompare from './sidebar/quiz-compare';
import { TQuiz } from '@/models/Quiz';

type Props = {
  params: {
    course: string,
    topic: string,
    quiz: string,
  };
  quizDescription: TQuiz;
};

export function QuizSideCard({ params, quizDescription }: Props) {
  const [value, setValue] = React.useState('description');

  const [doingActive, setDoingActive] = useState(false);
  const [descriptionDisabled, setDescriptionDisabled] = useState(false);
  const [revisionActive, setRevisionActive] = useState(false);
  const [compareActive, setCompareActive] = useState(false);


  const handleBeginClick = () => {
    setValue('doing');
    setDoingActive(true);
    setDescriptionDisabled(true);
  };

  const handleSubmit = () => {
    setValue('revision');
    setDoingActive(false);
    setRevisionActive(true);
    setCompareActive(true);
  };

  let content;
  switch (value) {
    case 'description':
      content = <QuizDescription params={params} quizDescription={quizDescription} onBegin={handleBeginClick}/>;
      break;
    case 'doing':
      content = <QuizDoing params={params} quizDescription={quizDescription}  onSubmit={handleSubmit}/>;
      break;
    case 'revision':
      content = <QuizRevision params={params} quizDescription={quizDescription}/>;
      break;
      case 'compare':
      content = <QuizCompare params={params} quizDescription={quizDescription}/>;
      break;
    default:
      content = <QuizDescription params={params} quizDescription={quizDescription} onBegin={handleBeginClick}/>;
      break;
  }

  return (
    <section className="w-full rounded-md bg-zinc-700 p-8 my-4 overflow-y-auto max-h-[80vh] text-white"> 
      <div className='flex flex-row justify-between items-center mb-8'>
        <h3 className="text-3xl font-semibold">{quizDescription.quiz}</h3>
        <ToggleGroup
                type="single" 
                value={value}
                onValueChange={(value) => {
                  if (value) setValue(value);
                }}
              >
                <ToggleGroupItem value="description" disabled={descriptionDisabled}><ClipboardIcon className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="doing" disabled={!doingActive}><BookOpenIcon className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value="revision" disabled={!revisionActive}><CheckIcon className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value="compare" disabled={!compareActive}><FileQuestionIcon className='h-4 w-4' /></ToggleGroupItem>              
              </ToggleGroup>
      </div>
        <div>
          {content}
        </div>
    </section>
  );
}
