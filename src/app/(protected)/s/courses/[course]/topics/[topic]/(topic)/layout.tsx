import React from 'react';
import { 
    ChevronsUpDownIcon, 
    PencilIcon,
    BookOpenIcon
} from '@/components/icons';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { 
    AvatarImage, 
    AvatarFallback, 
    Avatar 
} from "@/components/ui/avatar"
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { currentUser } from '@/lib/auth';
import { TTopic } from '@/models/Topic';
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
import { Button } from '@/components/ui/button';
import { deleteMember } from '@/actions/delete-member';
import { deleteMemberRedirect } from '@/actions/delete-member-redirect';
type Props = {
  params: { 
    course: string
 }
};

export default async function TopicsCourseLayout({
  children,
  params, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: {
    course: string;
  };
}) {
  const user = await currentUser();
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }
  try {
    const fetchCourse = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}`);
        const topics = await res.json();
        console.log("topics:", topics);
        return topics;
      }
    const course = await fetchCourse();
    return (
      <div className='pt-20'>
        <div className="hidden w-full lg:flex flex-row ">
            <div className='w-1/5  my-4 overflow-y-auto max-h-[85vh] text-white p-5 relative inset-x-0 z-50'>
                <div className="flex items-center justify-center ">
                    
                    <p className="text-2xl text-center">{course.course}</p>
                    {!course.courseAI && (
                      <Link href={`/s/courses/chat/${params.course}`} className='flex items-center py-2 px-4 rounded'>
                        <ChatBubbleIcon className="mr-2" />
                      </Link> 
                    )}
                    
                </div>
                <Collapsible>
                    <div className="">
                        <div 
                            className="rounded-md border px-4 py-3 mt-2 mb-7 font-mono text-sm flex flex-row items-center hover:bg-zinc-700 transition-colors duration-300"
                        >
                            <CollapsibleTrigger className="flex flex-row items-center justify-start w-full">
                                <Avatar>
                                    <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <p className="mx-4">student topic</p>
                                <span><ChevronsUpDownIcon className="w-4 h-4"/></span>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                        {/* Paticipantes */}
                        {course?.topics?.map((topic:TTopic, index:Number) => (
                            <Link 
                                href={`/s/courses/${params.course}/topics/${topic._id}`}
                                key={`topic-${index}`} 
                                className="rounded-md border px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center hover:bg-zinc-700 transition-colors duration-300"
                            >
                                <div className="flex flex-row items-center justify-start">
                                    <Avatar>
                                        <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <p className="mx-4">{topic.topic}</p>
                                </div>
                            </Link>
                        ))}
                    </CollapsibleContent>
                    </div>
                </Collapsible>
                <form action={deleteMemberRedirect}>
                    <input name="member" type="hidden" value={user.id} />
                    <input name="course" type="hidden" value={params.course} />
                    <Button 
                        className="rounded-md text-white  px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center bg-red-700 hover:bg-red-400 transition-colors duration-300"
                        type="submit"
                    >
                        <div className="flex flex-row items-center justify-start">
                            Unsubscribe
                        </div>
                    </Button>
                </form>
                
            </div>
            <div className='w-4/5 overflow-y-auto max-h-[90vh]'>
              {children}
            </div>
        </div>
        <div className="lg:hidden flex w-full flex-col items-center justify-center p-8 relative inset-x-0 mx-auto z-50">
            <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="default" className="bg-zinc-700 text-white hover:bg-zinc-700 transition-colors duration-300 bg-opacity-50 mb-4">Topics | {course.course}</Button>
                </DrawerTrigger>
                <DrawerContent className='max-h-[vh-80] max-w-[vw-80] overflow-y-hidden bg-zinc-700 border-zinc-700'>
                    <DrawerDescription className='p-4'>
                    <div className="flex items-center justify-center ">
                      <p className="text-2xl text-center">{course.course}</p>
                      {!course.courseAI && (
                        <Link href={`/s/courses/chat/${params.course}`} className='flex items-center py-2 px-4 rounded'>
                          <ChatBubbleIcon className="mr-2" />
                        </Link> 
                      )}
                    </div>
                      {course?.topics?.map((topic:TTopic, index:Number) => (
                          <Link 
                              href={`/s/courses/${params.course}/topics/${topic._id}`}
                              key={`topic-${index}`} 
                              className="rounded-md border px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center hover:bg-zinc-700 transition-colors duration-300"
                          >
                              <div className="flex flex-row items-center justify-start">
                                  <Avatar>
                                      <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                                      <AvatarFallback>JD</AvatarFallback>
                                  </Avatar>
                                  <p className="mx-4">{topic.topic}</p>
                              </div>
                          </Link>
                      ))}
                      <form action={deleteMemberRedirect} className='pt-4'>
                        <input name="member" type="hidden" value={user.id} />
                        <input name="course" type="hidden" value={params.course} />
                        <Button 
                            className="rounded-md  text-white  px-4 py-3 my-2 font-mono text-sm flex flex-row justify-center items-center bg-red-700 hover:bg-red-400 transition-colors duration-300"
                            type="submit"
                        >
                            <div className="flex flex-row items-center justify-center">
                                Unsubscribe
                            </div>
                        </Button>
                    </form>
                    </DrawerDescription>
                </DrawerContent>
            </Drawer>
            <div className='w-full overflow-y-auto max-h-[80vh]'>
              {children}
            </div>
        </div>
      </div>
    );
  } catch(err:any) {
    return (
      <div>
        Error Fetching Topics {user.id}
      </div>
    )
  }
  
}
