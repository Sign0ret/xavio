"use client";

import { useTransition, useState } from "react";
import { 
    ChevronsUpDownIcon, 
    PencilIcon,
    BookOpenIcon,
    CheckIcon
} from '@/components/icons';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
  
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { 
    AvatarImage, 
    AvatarFallback, 
    Avatar 
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TCourse } from "@/models/Course";
import { patchDescription } from "@/actions/patch-description";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  params: { 
    course: string,
  },
  courseDescription: TCourse | null;
};

export function PatchCourse({ params, courseDescription }:Props) {
    const user = useCurrentUser();
    const [onEditing, setOnEditing] = useState<boolean>(false)
  console.log("courseDescription:",courseDescription)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    if (!courseDescription) {
      return;
    }
    
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    if(!user) {
        return;
    }

    // Find the role of the user in the course
    const matchingMember = courseDescription.members.find((member) => member._id === user.id);

    return (
        <div className="w-full flex-1 ">
        <Sheet>
            <SheetTrigger>
            <div className="flex items-center gap-4">

                <Avatar>
                    <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-white">{courseDescription.course}</span>
                    <span className="text-sm text-gray-100 mr-auto">Online</span>
                </div>
                </div>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                <SheetDescription>
                    <div className="flex items-center justify-center">
                    <Avatar className="w-[150px] h-[150px] mb-5">
                        <AvatarImage alt="@janedoe" src={`${courseDescription.profile_photo}`} />
                        <AvatarFallback className="text-2xl text-center">{courseDescription.course}</AvatarFallback>
                    </Avatar>
                    </div>
                    <div>
                        {onEditing ? (
                            <form className="grid items-center justify-center grid-4" action={patchDescription}>
                                <input name="id" type="hidden" value={courseDescription._id} className="text-xl text-left bg-white"/>
                                <input name="course" type="text" defaultValue={courseDescription.course} className="text-xl text-left bg-white mb-2"/>
                                <input name="description" type="text" defaultValue={courseDescription.description} className="text-xl text-left bg-white"/>
                                <button 
                                    className="flex items-center py-2 rounded"
                                    type="submit"
                                >
                                    Done
                                    {/* <CheckIcon className="mr-2" /> */}
                                </button>                            
                            </form>
                        ) : (
                            <>
                            <div className="flex items-center justify-center">
                                <p className="text-2xl text-center">{courseDescription.course}</p>
                                <button 
                                    className="flex items-center py-2 px-4 rounded"
                                    onClick={() => setOnEditing(true)}
                                    >
                                    <PencilIcon className="mr-2" />
                                </button>
                            </div>
                            <div className="rounded-md my-2 font-mono text-sm flex flex-row justify-between items-center">
                             <div className="flex flex-row items-center justify-start">
                                 <p className="">{courseDescription.description}</p>
                             </div>
                            </div>
                            </>
                        )}
                        
                    </div>
                    <Collapsible>
                        <div className="flex flex-row justify-between items-center ">
                            <CollapsibleTrigger className="flex flex-row mt-5" >
                                <p>Members</p>
                                {/* Icono de despliegue */}
                                <span><ChevronsUpDownIcon className="w-4 h-4"/></span>
                            </CollapsibleTrigger>
                            <button className="flex items-center text-gray-450 font-bold mt-4 rounded">
                                <BookOpenIcon className="mr-2" />
                                Topics
                            </button>
                        </div>
                        
                        <CollapsibleContent>
                            {/* Paticipantes */}
                            {courseDescription.members.map((member) => (
                                <div 
                                    key={member._id} 
                                    className={`rounded-md border px-4 py-3 my-2 font-mono text-sm flex flex-row justify-between items-center hover:bg-gray-100 transition-colors duration-300 ${
                                      member.admin ? 'bg-zinc-200 hover:bg-zinc-400' : ''
                                    }`}
                                >
                                    <div className="flex flex-row items-center justify-start">
                                        <Avatar>
                                            <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <p className="mx-4">{member.member}</p>
                                    </div>
                                    {member.admin && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <button id="dropdownMenuIconButton" onClick={toggleDropdown} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                            </svg>
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem>Kick out</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    )}
                                </div>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </div>

    )
}