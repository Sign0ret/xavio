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
import { useRouter } from 'next/navigation'
import { TTopic } from '@/models/Topic';
import { PostQuiz } from '../../courses/chat/_components/forms/post-quiz';
import { PostSubject } from '../../courses/chat/_components/forms/post-subject';

type Props = {
    params: { 
        course: string,
        topic: string,
    },
    topics: TTopic[],
    onSuccess: () => void // Callback function to notify parent on success
};

const TopicActions: React.FC<Props> = ({ params, topics, onSuccess }) => {
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
                                        <PostSubject params={params} topics={topics} onSuccess={onSuccess} />
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
                                        <PostSubject params={params} topics={topics} onSuccess={onSuccess} />
                                    </DrawerDescription>
                                </DrawerHeader>
                            </DrawerContent>
                        </Drawer>
                        <Dialog>
                            <DialogTrigger className='hidden lg:flex'>
                                <DropdownMenuLabel className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                    <p>Quiz</p>
                                </DropdownMenuLabel>
                            </DialogTrigger>
                            <DialogContent className='text-white max-h-screen min-h-[90vh] bg-[#18181b]'>
                                <DialogHeader>
                                    <DialogTitle>New Quiz AI</DialogTitle>
                                    <DialogDescription>
                                        <PostQuiz params={params} topics={topics} onSuccess={onSuccess} />
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
                                        <PostQuiz params={params} topics={topics} onSuccess={onSuccess} />
                                    </DrawerDescription>
                                </DrawerHeader>
                            </DrawerContent>
                        </Drawer>
                    </DropdownMenuContent>
                </DropdownMenu>
            </form>
        </div>
    );
};

export default TopicActions;