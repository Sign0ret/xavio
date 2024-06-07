'use client'
import { useState, useEffect } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { MessageCircleIcon, BellIcon, XIcon, PlusIcon, BookOpenIcon,  } from '@/components/icons';
import { TCourse } from '@/models/Course';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { PostCourse } from './_components/forms/post-course';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function ClasesLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    const user = useCurrentUser()
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(true);
    const [chatsInfo, setChatsInfo] = useState([]); // State to hold fetched chat data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    useEffect(() => {
      fetchCourses(); // Fetch courses when component mounts
  
      // Cleanup function if needed
      return () => {
        // Cleanup code if any
      };
    }, []);
    ` `
    if (!user) {
      return;
    }
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/${user.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await res.json();
        setChatsInfo(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
  

      const handleCourseCreated = () => {
        // Fetch courses again to update the list after a new course is created
        fetchCourses();
         // Assuming fetchCourses is defined in the scope of ClasesLayout
      };
    return (
      <section>
        {open ? (
            <div className="grid max-h-full h-4/5 lg:min-h-screen w-full lg:grid-cols-[280px_1fr] ">
            <div className="border-r bg-[#18181b] lg:block relative inset-x-0 z-20">
                <div className="flex h-full max-h-screen pt-[70px] flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                    <Link className="flex items-center gap-2 font-semibold  text-white" href={`/s/courses/chat`}>
                    <MessageCircleIcon className="h-6 w-6" />
                    <span className="">Clases</span>
                    </Link>
                    <Dialog>
                        <DialogTrigger className='ml-auto'>
                          <Button className=" h-8 w-8 bg-purple-600 border-purple-600 text-white" size="icon" variant="outline">
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Add course</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='max-h-screen min-h-[90vh] scrollbar-thumbrounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-900 scrollbar-track-zinc-900 h-32 overflow-y-scroll'>
                            <DialogHeader>
                                <DialogTitle>New Course</DialogTitle>
                                <DialogDescription>
                                  <PostCourse onSuccess={handleCourseCreated} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    
                    <Button className="hidden lg:flex ml-2 h-8 w-8 bg-purple-600 border-purple-600 text-white" size="icon" variant="outline" onClick={() => setOpen(false)}>
                        <XIcon className="h-4 w-4" />
                        <span className="sr-only">Hide sidebar</span>
                    </Button>
                </div>
                <div className="flex-1 scrollbar-thumbrounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-900 scrollbar-track-zinc-900 h-32 overflow-y-scroll py-2">
                    {/* lg */}
                    <nav className="grid items-start px-4 text-sm font-medium ">
                        {chatsInfo.map((course:TCourse, index) => (
                            <Link
                            key={index}
                            className={`flex items-center gap-3 rounded-lg ${selectedChat === index ? 'bg-zin-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50' : 'px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
                            href={`/s/courses/chat/${course._id}`}
                            onClick={() => setSelectedChat(index)}
                            >
                            <Avatar className="z-0"> {/* Change z-[-20] to z-0 */}
                                <AvatarImage alt={`@${course._id}`} src="/placeholder-avatar.jpg" />
                                <AvatarFallback>{course.course.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className='text-white hover:text-white-400'>{course.course}</div>
                                {/* <div className="text-xs text-white">{course.message}</div> */}
                            </div>
{/*                             <Badge className="ml-auto bg-purple-600 hover:bg-white hover:text-black">{course.badge}</Badge>
 */}                            </Link>
                        ))}
                    </nav>
                </div>
                </div>
            </div>

            <section >
              {children}
            </section>
            </div>
        ) : (
            <section>
            <div className="hidden lg:grid max-h-full h-4/5 lg:min-h-screen w-full lg:grid-cols-[40px_1fr]  ">
                <div className="flex h-full max-h-screen flex-col gap-2 ">
                <div className="flex h-[60px] items-center border-b bg-gray-100/40 dark:bg-gray-800/40">
                    <Button className="ml-auto h-8 w-8" size="icon" variant="outline" onClick={() => setOpen(true)}>
                        <MessageCircleIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                </div>
            <section >
              {children}
            </section>
            </div>
            <div className="grid lg:hidden max-h-full h-4/5 lg:min-h-screen w-full lg:grid-cols-[280px_1fr] pt-[70px]  ">
                <div className="border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 ">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link className="flex items-center gap-2 font-semibold" href={`/s/chat`}>
                        <MessageCircleIcon className="h-6 w-6" />
                        <span className="">JMO</span>
                        </Link>
                        <Drawer>
                            <DrawerTrigger>
                              <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                                <BellIcon className="h-4 w-4" />
                                <span className="sr-only">Toggle notifications</span>
                              </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Add Course</DrawerTitle>
                                <DrawerDescription>
                                <PostCourse onSuccess={handleCourseCreated} />
                                </DrawerDescription>
                            </DrawerHeader>
                            </DrawerContent>
                        </Drawer>
                        
                        <Button className="hidden lg:flex ml-2 h-8 w-8" size="icon" variant="outline" onClick={() => setOpen(false)}>
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">Hide sidebar</span>
                        </Button>
        
                    </div>
                    <div className="flex-1 scrollbar-thumbrounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-900 scrollbar-track-zinc-900 h-32 overflow-y-scroll py-2">
                        <div className="px-4 mb-4">
                            <Input placeholder="Search contacts..." />
                        </div>
                        {/* mobile */}
                        <nav className="grid items-start px-4 text-sm font-medium">
                            {chatsInfo.map((course:TCourse, index) => (
                                <Link
                                key={index}
                                className={`flex items-center gap-3 rounded-lg ${selectedChat === index ? 'bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50' : 'px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
                                href={`/s/courses/chat/${course._id}`}
                                onClick={() => setSelectedChat(index)}
                                >
                                <Avatar>
                                    <AvatarImage alt={`@${course._id}`} src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>{course.course.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div>{course.course}</div>
                                    {/* <div className="text-xs text-gray-400">{course.message}</div> */}
                                </div>
{/*                                 <Badge className="ml-auto bg-purple-600 hover:bg-white hover:text-black">{course.badge}</Badge>
 */}                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <section >
              {children}
            </section>
            </div>
            </section>
        )}
      </section>
      
    )
  }  