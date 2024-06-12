import React from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, CheckIcon, ClockIcon, CopyIcon, DownloadIcon, FileQuestionIcon, FlagIcon, StarIcon } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { currentUser } from '@/lib/auth';
import { TSubmitT, TTask } from '@/models/Task';
import { IQuiz, ISubmit, TQuiz, TSubmit } from '@/models/Quiz';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { TContent, TSource, TTopic } from '@/models/Topic';
import moment from "moment"
import axios from 'axios';

type Props = {
  params: { 
    course: string,
    topic: string,
 }
};
// content (.md, .pdf) quizzes, tasks,
export default async function TopicCourse({ params }: Props) {
  const user = await currentUser();
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }
  try {
    const fetchTopic = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}`);
      const topic = await res.json();
      return topic;
    }
    const topic: TTopic = await fetchTopic();
    if (!topic) {
      return (
        <div>ERROR FETCHING THE TOPIC</div>
      )
    }
    // obtenemos nombre del curso sin gastar recursos
    const fetchCourseName = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/coursename`);
      const course = await res.json();
      return course;
    }
    const courseName = await fetchCourseName();
    console.log("courseName:",courseName)
    if (!courseName) {
      return (
        <div>ERROR FETCHING THE courseName</div>
      )
    }
    const onCreate = async () => {
      try {
          // Find the selected topic based on the topic ID
          // Call the API to generate the quiz
          const response = await axios.post('http://localhost:3000/api/generateTopic', {
              topicPassed: topic.topic, // Pass the topic name
              detail: "high",
              course: courseName.course,
          });

          if (response.status !== 200) {
              throw new Error("Failed to generate content");
          }

          const contentData = response.data;
          console.log("contentData:",contentData)
          // Call the API to save the quiz to MongoDB
          const saveResponse = await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}`, contentData);

          if (saveResponse.status !== 200) {
              throw new Error("Failed to save Content");
          }
      } catch (error: any) {
      } finally {
        // refresh
      }
  };

    if (!topic.contents || topic.contents.length === 0 ) {
      onCreate();
      // refresh a la ruta
    }
    const formattedDate = (date: Date | undefined) => {
        return date ? moment(date).format('HH:mm DD-MM-YY') : '';
    };
    return (
      <div className="container mx-auto my-12 px-4 md:px-6 lg:px-8 relative inset-x-0 z-50">
        <section className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Brief</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* brief */}
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">{topic.topic}</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {topic.brief}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
        <section className="grid gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* content */}
            {topic?.contents?.map((content:TContent) => (
              <div 
                key={`${content._id}`}
                className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <h4 className="text-lg font-medium">{content.title.length > 20 ? `${content.title.slice(0, 20)}...` : content.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    aqui
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {content.description}
                </p>
                <Button variant="outline">View</Button>
              </div>
            ))}
            {/* task */}
            {topic?.tasks?.map((task:TTask) => {
              const userSubmit = task.submits?.find((submit:TSubmitT) => submit.sender === user.id);
              return (
                <Link 
                key={`${task._id}`}
                href={`/s/courses/${params.course}/topics/${params.topic}/quizzes/${task._id}`}
                className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800 hover:bg-zinc-400"
              >
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
            )})}
            {/* quiz */}
            {topic?.quizzes?.map((quiz:TQuiz) => {
              console.log('quiz:',quiz);
              const userSubmit = quiz.submits.find((submit:TSubmit) => submit.sender === user.id);
              return (
                <Link 
                  key={`${quiz._id}`}
                  href={`/s/courses/${params.course}/topics/${params.topic}/quizzes/${quiz._id}`}
                  className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800 hover:bg-zinc-400"
                >
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
            )})}
          </CardContent>
        </Card>
      </section>
      {/* external */}
      <section className="mt-6 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>External Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {topic?.sources?.map((source:TSource) => (
              <div
                key={`${source._id}`}
                className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium">{source.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <ExternalLinkIcon className="h-4 w-4" />
                    <a className="underline" href={`${source.url}`}>
                      Visit
                    </a>
                  </div>
                </div>
            </div>
            ))}
          </CardContent>
        </Card>
      </section>
      {/* integrated chat */}
      <section className="mt-6">
        <Card>
            <CardHeader>
              <CardTitle>CHATGPT with NEARBYY questions and answers (not saved) (only one answer will be displayed)</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              <div className='flex flex-row gap-4 mb-5'>
                  <Input 
                      className="flex-1 bg-zinc-200" 
                      placeholder="Type a message..."
                  />
                  <Button 
                      variant="outline" 
                      className='bg-purple-600 text-white' 
                      type='submit'
                      >
                      Send
                  </Button>
              </div>
              <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium">Answer Title</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Button size="sm" variant="ghost">
                  <CopyIcon className="h-4 w-4" />
                  <span className="ml-2">Copy</span>
                  </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A comprehensive guide to the fundamentals of web development.
                </p>
              </div>
            </CardContent>
          </Card>
      </section>
      </div>
    )
  } catch(err:any) {
    return (
      <div>
        Error Fetching Topics {user.id}
      </div>
    )
  }
}
