"use client";
import React from 'react'
import { 
    PencilIcon, 
    BookOpenIcon,
    FileQuestionIcon,
  } from '@/components/icons';
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
    DropdownMenuTrigger, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuItem, 
    DropdownMenuContent, 
    DropdownMenu 
  } from "@/components/ui/dropdown-menu"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { TTopic } from '@/models/Topic';
import { PostQuiz } from '../../courses/chat/_components/forms/post-quiz';
import { PostSubject } from '../../courses/chat/_components/forms/post-subject';



  type Props = {
    params: { 
      course: string,
      topic: string,
   },
   topics: TTopic[];
  };
  
export default function TopicActions({params, topics}:Props) {
    const fetchTopic = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}`);
        const topic = await res.json();
        console.log(topic); 
        return topic;
      }
    const handleTopicUpdated = () => {
        console.log("Se intentó");
        // Fetch courses again to update the list after a new course is created
        fetchTopic();
        // Assuming fetchCourses is defined in the scope of ClasesLayout
      };
  return (
    <div>
              <form className="flex items-center gap-4">
                      <DropdownMenu>
                          <DropdownMenuTrigger>
                              <p>Add Quiz or Task +</p>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='flex flex-col ml-14 mb-2 bg-[#18181b] text-white'>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
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
                                                  <PostSubject params={params} topics={topics} onSuccess={handleTopicUpdated}/>
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
                                              <PostSubject params={params} topics={topics} onSuccess={handleTopicUpdated}/>
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
                                                  <PostQuiz params={params} topics={topics} onSuccess={handleTopicUpdated} />
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
                                              <PostQuiz params={params} topics={topics} onSuccess={handleTopicUpdated}/>
                                          </DrawerDescription>
                                          </DrawerHeader>
                                      </DrawerContent>
                                  </Drawer>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </form>
            </div>
  )
}
