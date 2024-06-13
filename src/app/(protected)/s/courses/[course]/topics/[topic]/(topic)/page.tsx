"use client"
import React, { useState, useEffect } from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { CalendarIcon, CheckIcon, ClockIcon, FileQuestionIcon, StarIcon, CopyIcon } from "@/components/icons";
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { currentUser } from '@/lib/auth';
import { TSubmitT, TTask } from '@/models/Task';
import { TQuiz, TSubmit } from '@/models/Quiz';
import { TContent, TSection, TSource, TTopic } from '@/models/Topic';
import moment from "moment";
import axios from 'axios';
import TopicActions from '@/app/(protected)/s/_components/topic/topic-actions';
import { useCurrentUser } from '@/hooks/use-current-user';

type Props = {
  params: {
    course: string,
    topic: string,
  }
};

type User = {
  id: string;
  // Add other user properties as needed
};

export default function TopicCourse({ params }: Props) {
  const [topics, setTopics] = useState<TTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const user = useCurrentUser();

  const fetchTopic = async (): Promise<TTopic> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}`);
    const topic = await res.json();
    return topic;
  };

  const fetchCourseName = async (): Promise<{ course: string }> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/coursename`);
    const course = await res.json();
    return course;
  };

  const onCreate = async (topic: TTopic) => {
    try {
      const courseName = await fetchCourseName();
      if (!courseName) throw new Error("Failed to fetch course name");

      const response = await axios.post('http://localhost:3000/api/generateTopic', {
        topicPassed: topic.topic,
        detail: "high",
        course: courseName.course,
      });

      if (response.status !== 200) throw new Error("Failed to generate content");

      const contentData = response.data;

      const saveResponse = await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}`, contentData);
      if (saveResponse.status !== 200) throw new Error("Failed to save Content");

      handleTopicUpdated();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleTopicUpdated = async () => {
    const updatedTopic = await fetchTopic();
    setTopics([updatedTopic]);
  };

  useEffect(() => {
    const initializeTopic = async () => {
      const topic = await fetchTopic();
      if (!topic) throw new Error("ERROR FETCHING THE TOPIC");

      setTopics([topic]);

      if (!topic.contents || topic.contents.length === 0) {
        await onCreate(topic);
      }
      setLoading(false);
    };
    
    initializeTopic();
  }, []);

  const formattedDate = (date: Date | undefined) => {
    return date ? moment(date).format('HH:mm DD-MM-YY') : '';
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>ERROR FETCHING THE USER</div>;

  const topic = topics[0];


  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const topicResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}`);
      const topicData = await topicResponse.json();
      const context = JSON.stringify(topicData);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/makeQuestion`, {
        question,
        context
      });

      setResponse(response.data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };
  return (
    <div className="container mx-auto my-12 px-4 md:px-6 lg:px-8 relative inset-x-0 z-50 ">
      <section className="grid gap-6">
        {!topic.contents || topic.contents.length === 0 && (
          <Link className='bg-slate-800/[0.8] border-slate-800 text-white rounded-3xl p-4' href={`/s/courses/${params.course}/topics/${params.topic}`}>
            REFRESH ME, WE ARE GENERATING THE CONTENT FOR YOU
          </Link>
        )}
        <Card className='bg-slate-800/[0.8] border-slate-800 text-white rounded-3xl'>
          <CardHeader>
            <CardTitle>Brief</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">{topic.topic}</h4>
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-300">
                {topic.brief}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-6 mt-6">
        <Card className='bg-slate-800/[0.8] border-slate-800 text-white rounded-3xl'>
          <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {topic?.contents?.map((content: TContent) => (
              <div key={content._id} className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <h4 className="text-lg font-medium">{content.title.length > 20 ? `${content.title.slice(0, 20)}...` : content.title}</h4>
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-300">
                  {content.description}
                </p>
                <div className='text-gray-200'>
                  {content?.sections?.map((section: TSection) => (
                    <div key={section._id}>
                      <h6>{section.subtitle}</h6>
                      <p className="text-sm text-gray-400 dark:text-gray-300">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {topic?.tasks?.map((task: TTask) => {
              const userSubmit = task.submits?.find((submit: TSubmitT) => submit.sender === user.id);
              return (
                <Link key={task._id} href={`/s/courses/${params.course}/topics/${params.topic}/tasks/${task._id}`} className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800 hover:bg-zinc-400 der-gray-800 hover:bg-zinc-400">
                   <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className='flex flex-row justify-start align-center'>
                      <CheckIcon className='h-5 w-5 mt-1 mr-1' />
                      <h4 className="text-lg font-medium">{task.task.length > 20 ? `${task.task.slice(0, 20)}...` : task.task}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {userSubmit ? `Submitted ${formattedDate(userSubmit.updatedAt)}` : `Due ${formattedDate(task.deadline)}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <StarIcon className={`h-4 w-4 ${userSubmit ? 'fill-green-500' : 'fill-yellow-500'}`} />
                      <span>{userSubmit ? userSubmit.grade : task.maxpoints} pts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4" />
                      {userSubmit ? <span>done</span> : <span>{task.timeexp} mins</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
            {topic?.quizzes?.map((quiz: TQuiz) => {
              const userSubmit = quiz.submits.find((submit: TSubmit) => submit.sender === user.id);
              return (
                <Link key={quiz._id} href={`/s/courses/${params.course}/topics/${params.topic}/quizzes/${quiz._id}`} className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800 hover:bg-zinc-400">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className='flex flex-row justify-start align-center'>
                      <FileQuestionIcon className='h-5 w-5 mt-1 mr-1' />
                      <h4 className="text-lg font-medium">{quiz.quiz.length > 20 ? `${quiz.quiz.slice(0, 20)}...` : quiz.quiz}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {userSubmit ? `Submitted ${formattedDate(userSubmit.updatedAt)}` : `Due ${formattedDate(quiz.deadline)}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <StarIcon className={`h-4 w-4 ${userSubmit ? 'fill-green-500' : 'fill-yellow-500'}`} />
                      <span>{userSubmit ? userSubmit.grade : quiz.maxpoints} pts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4" />
                      {userSubmit ? (
                        userSubmit.open ? <span>open</span> : <span>close</span>
                      ) : (
                        <span>{quiz.timelimit} mins</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className='flex justify-center'>
              <TopicActions params={params} topics={topics} onSuccess={handleTopicUpdated} />
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="mt-6 grid gap-6">
        <Card className='bg-slate-800/[0.8] border-slate-800 text-white rounded-3xl'>
          <CardHeader>
            <CardTitle>External Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {topic?.sources?.map((source: TSource) => (
              <div key={source._id} className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{source.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <ExternalLinkIcon className="h-4 w-4" />
                    <a className="underline" href={source.url}>
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <section className="mt-6 grid gap-6">
        <Card className='bg-slate-800/[0.8] border-slate-800 text-white rounded-3xl'>
          <CardHeader>
            <CardTitle>CHATGPT with NEARBYY questions and answers (not saved) (only one answer will be displayed)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row gap-4 mb-5'>
              <Input
                className="flex-1 bg-slate-700"
                placeholder="Type a message..."
                value={question}
                onChange={handleQuestionChange}
              />
              <Button variant="outline" className='bg-purple-600 text-white' onClick={handleSubmit}>
                Send
              </Button>
            </div>
            {response && (
              <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium">Answer</h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {response}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}