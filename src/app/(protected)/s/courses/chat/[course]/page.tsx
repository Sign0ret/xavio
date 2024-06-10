"use client"
import React from 'react';
import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import useChatSocket from '../_components/socket/functions';
import { Message } from '../_components/messages/message';


import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { 
    DropdownMenuTrigger, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuItem, 
    DropdownMenuContent, 
    DropdownMenu 
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  SelectValue, 
  SelectTrigger, 
  SelectItem, 
  SelectContent, 
  Select 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { 
  TextIcon, 
  MessageCircleIcon, 
  PencilIcon, 
  XIcon, 
  UploadIcon, 
  FileIcon,
  FileQuestionIcon,
  CheckIcon,
  BookIcon,
  ClipboardIcon,
  BookOpenIcon,
  CameraIcon,
  ChevronsUpDownIcon,
} from '@/components/icons';
import { Boilerplate_message } from '../_components/messages/boilerplate';
import { Right_bar } from '../_components/rightbar';
import { Reply } from '../_components/messages/reply';
import { PostMedia } from '../_components/forms/post-media';
import { PostTopic } from '../_components/forms/post-topic';
import { PostSubject } from '../_components/forms/post-subject';
import { PostQuiz } from '../_components/forms/post-quiz';
import { PatchCourse } from '../_components/forms/patch-course';
import useWebSocketConnection from '../_components/socket/connection';
import { TCourse, TMember } from '@/models/Course';
import { useCurrentUser } from '@/hooks/use-current-user';

type Props = {
  params: { 
    course: string,
  }
};

export default function ChatClase({ params }: Props) {
    const { socket, messages, topRef, scrollContainerRef } = useWebSocketConnection(params.course);
    const user = useCurrentUser();

  const {
    message,
    setMessage,
    sendMessage,
  } = useChatSocket(socket);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage();
    } else {
      console.log('Message cannot be empty');
    }
  };

  const [reply, setReply] = useState<Message | null>(null);
  const handleCloseReply = () => setReply(null);
  const handleOpenReply = (message: Message) => setReply(message);

  const [openTasks, setOpenTasks] = useState<boolean>(false);
  const [upInput, setUpInput] = useState<boolean>(false);
  const [course, setCourse] = useState<TCourse | null>(null);
  const [error, setError] = useState(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);


  useEffect(() => {
    fetchCourse(); // Fetch courses when component mounts

    // Cleanup function if needed
    return () => {
      // Cleanup code if any
    };
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}`);
      if (!res.ok) {
        throw new Error('Failed to fetch course');
      }
      const data = await res.json();
      setCourse(data);
      setShouldScrollToBottom(true);
    } catch (error: any) {
      setError(error);
    }
    }

    const handleCourseUpdated = () => {
        // Fetch courses again to update the list after a new course is created
        fetchCourse();
         // Assuming fetchCourses is defined in the scope of ClasesLayout
      };

    // Effect to scroll to bottom when messages update or shouldScrollToBottom is true
    useEffect(() => {
        if (shouldScrollToBottom && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            setShouldScrollToBottom(false); // Reset flag after scrolling
        }
    }, [messages, shouldScrollToBottom]);

    if (!user) {
        return <p>No User</p>;
      }
  if (!course) {
    return <p>Loading...</p>;
  }

  const matchingMember: TMember | null = course.members.find((member) => member.member === user.id) ?? null;

  return (
    <section>
        <div className="flex flex-col fixed inset-0 lg:static scrollbar-thumbrounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-900 scrollbar-track-zinc-900 h-32 overflow-y-scroll pt-[70px] min-h-screen h-screen bg-[#18181b] z-40">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#18181b] px-6 relative inset-x-0 z-50">
            <Link className="lg:hidden" href={`/s/courses/chat`}>
                <MessageCircleIcon className="h-6 w-6 text-white"/>
                <span className="sr-only">Classes</span>
            </Link>
            <PatchCourse params={params} courseDescription={course} onSuccess={handleCourseUpdated} />
            <Button className="flex ml-2 h-8 w-8 bg-purple-600 border-purple-600 text-white" size="icon" variant="outline" onClick={() => setUpInput(!upInput)}>
                <ChevronsUpDownIcon className="h-4 w-4"/>
                <span className="sr-only">Move up</span>
            </Button>
            <div className='hidden lg:flex'>
                {openTasks ? (
                    <Button className="flex ml-2 h-8 w-8 bg-purple-600 border-purple-600 text-white" size="icon" variant="outline" onClick={() => setOpenTasks(false)}>
                        <XIcon className="h-4 w-4" />
                        <span className="sr-only">Hide tasksbar</span>
                    </Button>
                ) : (
                    <Button className="flex ml-2 h-8 w-8 bg-purple-600 border-purple-600 text-white" size="icon" variant="outline" onClick={() => setOpenTasks(true)}>
                        <TextIcon className="h-4 w-4" />
                        <span className="sr-only">open tasks</span>
                    </Button>
                )}
            </div>
            <Sheet>
                <SheetTrigger className='flex lg:hidden'>
                    <Button className="flex ml-2 h-8 w-8 bg-purple-600 border-purple-600 text-white" size="icon" variant="outline" onClick={() => setOpenTasks(true)}>
                        <TextIcon className="h-4 w-4 text-white" />
                        <span className="sr-only">open tasks</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className='bg-zinc-900'>
                    <Right_bar params={params} courseInfo={course} />
                </SheetContent>
            </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pr-0 mr-0 bg-zinc-900 md:pr-0 max-h-full overflow-y-hidden">
            {openTasks ? (
                <section className='hidden lg:flex flex-row overflow-y-hidden'>
                <div className="w-4/5 p-4 overflow-y-auto no-scrollbar" ref={scrollContainerRef}>
                    <div ref={topRef}></div>
                    {messages.map((msg: Message, index) => (
                        <Boilerplate_message key={`${index}-mensaje`} message={msg} params={params} onReply={handleOpenReply} socket={socket}/>
                    ))}
                </div>
                <section className='w-[280px] relative inset-x-0 max-w-2xl mx-auto z-50'>
                    <Right_bar params={params} courseInfo={course} />
                </section>
            </section>
            ) : (
                <div className='p-4 overflow-y-auto no-scrollbar mr-4' ref={scrollContainerRef}>
                    <div ref={topRef}></div>
                    {messages.map((msg: Message, index) => (
                        <Boilerplate_message key={`${index}-mensaje`} message={msg} params={params} onReply={handleOpenReply} socket={socket}/>
                    ))}
                </div>
            )}
            <div className={`mt-auto pr-6 ${upInput ? 'mb-20' : 'mb-0'} relative inset-x-0 z-50`}>
                {reply && (
                    <div className='mb-2 pl-20'>
                        <Reply message={reply} onClose={handleCloseReply}/>
                    </div>
                )}
                <form className="flex items-center gap-4" onSubmit={handleSubmit}>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <PencilIcon className="h-4 w-4 ml-4 text-white"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='flex flex-col ml-14 mb-2 bg-[#18181b] text-white'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Dialog>
                                <DialogTrigger className='hidden lg:flex'>
                                    <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                        <span><CameraIcon className='h-4 w-4 mr-2' /></span>
                                        <p>Media</p>
                                    </DropdownMenuLabel>
                                </DialogTrigger>
                                <DialogContent className='max-h-screen min-h-[90vh] scrollbar-thumbrounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-900 scrollbar-track-zinc-900 h-32 overflow-y-scroll'>
                                    <DialogHeader>
                                        <DialogTitle>Upload Media</DialogTitle>
                                        <DialogDescription>
                                            <PostMedia params={params} />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Drawer>
                                <DrawerTrigger className='flex lg:hidden'>
                                    <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                        Media
                                    </DropdownMenuLabel>
                                </DrawerTrigger>
                                <DrawerContent className='max-h-screen scrollbar-thumbrounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-900 scrollbar-track-zinc-900 h-32 overflow-y-scroll'>
                                    <DrawerHeader>
                                    <DrawerTitle>Upload Media</DrawerTitle>
                                    <DrawerDescription>
                                        <PostMedia params={params} />
                                    </DrawerDescription>
                                    </DrawerHeader>
                                </DrawerContent>
                            </Drawer>
                            {matchingMember?.admin && (
                            <>
                                <Dialog>
                                    <DialogTrigger className='hidden lg:flex'>
                                        <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                            <span><BookOpenIcon className='h-4 w-4 mr-2' /></span>
                                            <p>Task</p>
                                        </DropdownMenuLabel>
                                    </DialogTrigger>
                                    <DialogContent className='text-white max-h-screen min-h-[90vh] bg-[#18181b]'>
                                        <DialogHeader>
                                            <DialogTitle>New Task AI</DialogTitle>
                                            <DialogDescription>
                                                <PostSubject params={params} topics={course.topics} onSuccess={handleCourseUpdated}/>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Drawer>
                                    <DrawerTrigger className='flex lg:hidden'>
                                        <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                            Task
                                        </DropdownMenuLabel>
                                    </DrawerTrigger>
                                    <DrawerContent className='text-white max-h-screen min-h-[90vh] bg-[#18181b]'>
                                        <DrawerHeader>
                                        <DrawerTitle>New Task AI</DrawerTitle>
                                        <DrawerDescription>
                                            <PostSubject params={params} topics={course.topics} onSuccess={handleCourseUpdated}/>
                                        </DrawerDescription>
                                        </DrawerHeader>
                                    </DrawerContent>
                                </Drawer>
                                <Dialog>
                                    <DialogTrigger className='hidden lg:flex'>
                                        <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                            <span><FileQuestionIcon className='h-4 w-4 mr-2' /></span>
                                            <p>Quiz</p>
                                        </DropdownMenuLabel>
                                    </DialogTrigger>
                                    <DialogContent className='text-white max-h-screen min-h-[90vh] bg-[#18181b] '>
                                        <DialogHeader>
                                            <DialogTitle>New Quiz AI</DialogTitle>
                                            <DialogDescription>
                                                <PostQuiz params={params} topics={course.topics} onSuccess={handleCourseUpdated} />
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Drawer>
                                    <DrawerTrigger className='flex lg:hidden'>
                                        <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                            Quiz
                                        </DropdownMenuLabel>
                                    </DrawerTrigger>
                                    <DrawerContent className='text-white max-h-screen min-h-[90vh] bg-[#18181b]'>
                                        <DrawerHeader>
                                        <DrawerTitle>New Quiz AI</DrawerTitle>
                                        <DrawerDescription>
                                            <PostQuiz params={params} topics={course.topics} onSuccess={handleCourseUpdated}/>
                                        </DrawerDescription>
                                        </DrawerHeader>
                                    </DrawerContent>
                                </Drawer>
                                <Dialog>
                                    <DialogTrigger className='hidden lg:flex'>
                                        <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                            <span><CheckIcon className='h-4 w-4 mr-2' /></span>
                                            <p>Topic</p>
                                        </DropdownMenuLabel>
                                    </DialogTrigger>
                                    <DialogContent className='text-white max-h-screen min-h-[90vh] bg-[#18181b] '>
                                        <DialogHeader>
                                            <DialogTitle>New Topic</DialogTitle>
                                            <DialogDescription>
                                                <PostTopic params={params} courseName={course.course} onSuccess={handleCourseUpdated}/>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Drawer>
                                    <DrawerTrigger className='flex lg:hidden'>
                                        <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                            Topic
                                        </DropdownMenuLabel>
                                    </DrawerTrigger>
                                    <DrawerContent className='text-white max-h-screen min-h-[90vh] bg-[#18181b]'>
                                    <DrawerHeader>
                                        <DrawerTitle>New Topic</DrawerTitle>
                                        <DrawerDescription>
                                            <PostTopic params={params} courseName={course.course} onSuccess={handleCourseUpdated}/>
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    </DrawerContent>
                                </Drawer>
                            </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Input 
                        value={message}
                        className="flex-1 bg-zinc-200" 
                        placeholder="Type a message..."
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="outline" className='bg-purple-600 text-white' type='submit'>
                        Send
                    </Button>
                </form>
            </div>
        </main>
    </div>        
    </section>
  );
}