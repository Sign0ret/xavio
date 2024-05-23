import React from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, CopyIcon, DownloadIcon, FlagIcon, StarIcon } from "@/components/icons"
import { Input } from "@/components/ui/input"

type Props = {
  params: { 
    course: string,
    topic: string,
 }
};

export default function TopicCourse({ params }: Props) {
  return (
    <div className="container mx-auto my-12 px-4 md:px-6 lg:px-8 relative inset-x-0 z-50">
      <section className="grid gap-6 overflow-y-scroll">
      <Card>
        <CardHeader>
        <CardTitle>Markdown Files</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
        <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">Git Cheatsheet</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <DownloadIcon className="h-4 w-4" />
                <Link className="underline" href="#">
                Download
                </Link>
            </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            A quick reference guide for common Git commands and workflows.
            </p>
            <Button variant="outline">View</Button>
        </div>
        <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">Responsive Design Principles</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <DownloadIcon className="h-4 w-4" />
                <Link className="underline" href="#">
                Download
                </Link>
            </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            An overview of the key principles for building responsive websites.
            </p>
            <Button variant="outline">View</Button>
        </div>
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
            <CardTitle>PDFs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Introduction to Web Development</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <DownloadIcon className="h-4 w-4" />
                  <Link className="underline" href="#">
                    Download
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A comprehensive guide to the fundamentals of web development.
              </p>
              <Button variant="outline">View</Button>
            </div>
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">CSS Best Practices</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <DownloadIcon className="h-4 w-4" />
                  <Link className="underline" href="#">
                    Download
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">A guide to writing clean, maintainable CSS.</p>
              <Button variant="outline">View</Button>
            </div>
          </CardContent>
        </Card> 
        <Card>
          <CardHeader>
            <CardTitle>External Resources by PERPLEXITY ai</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Git Cheatsheet</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <DownloadIcon className="h-4 w-4" />
                  <Link className="underline" href="#">
                    Download
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A quick reference guide for common Git commands and workflows.
              </p>
              <Button variant="outline">View</Button>
            </div>
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Responsive Design Principles</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <DownloadIcon className="h-4 w-4" />
                  <Link className="underline" href="#">
                    Download
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                An overview of the key principles for building responsive websites.
              </p>
              <Button variant="outline">View</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Build a Personal Website</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Due July 1</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <StarIcon className="h-4 w-4 fill-yellow-500" />
                  <span>100 points</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FlagIcon className="h-4 w-4 fill-yellow-500" />
                  <span>Intermediate</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon className="h-4 w-4" />
                  <span>8 hours</span>
                </div>
              </div>
            </div>
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Create a Blog Post</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Due June 30</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <StarIcon className="h-4 w-4 fill-yellow-500" />
                  <span>75 points</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FlagIcon className="h-4 w-4 fill-green-500" />
                  <span>Beginner</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon className="h-4 w-4" />
                  <span>4 hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quizzes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Introduction to HTML</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon className="h-4 w-4" />
                  <span>30 mins</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Due May 31</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <StarIcon className="h-4 w-4 fill-yellow-500" />
                  <span>50 points</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FlagIcon className="h-4 w-4 fill-green-500" />
                  <span>Beginner</span>
                </div>
              </div>
            </div>
            <div className="grid gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">CSS Fundamentals</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon className="h-4 w-4" />
                  <span>45 mins</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Due June 15</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <StarIcon className="h-4 w-4 fill-yellow-500" />
                  <span>75 points</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FlagIcon className="h-4 w-4 fill-yellow-500" />
                  <span>Intermediate</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>        
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
}
