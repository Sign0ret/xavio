"use client";

import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TareasSchema } from "@/schemas/xavio";
import { useSearchParams } from "next/navigation";
import { MdKeyboardArrowDown } from 'react-icons/md';

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
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

type Props = {
    params: { 
      id: string,
      clase: string,
   }
  };

export function PatchClass({ params }: Props) {
    return (
        <div className="w-full flex-1">
        <Sheet>
            <SheetTrigger>
            <div className="flex items-center gap-4">

                <Avatar>
                    <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold">{params.clase}</span>
                    <span className="text-sm text-gray-500 mr-auto">Online</span>
                </div>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetDescription>
                    <Avatar style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px' }}>
                        <AvatarImage style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="@janedoe" src="/placeholder-avatar.jpg" />
                        <AvatarFallback style={{ fontSize: '24px', textAlign: 'center' }}>Mate</AvatarFallback>
                    </Avatar>
                    <p>Matematicas basicas</p>
                    <Collapsible>
                        <CollapsibleTrigger className="flex flex-row">
                            <p>Participantes</p>
                             <span><MdKeyboardArrowDown /></span>
                            </CollapsibleTrigger>
                        <CollapsibleContent>
                            Yes. Free to use for personal and commercial projects. No attribution
                            required.
                        </CollapsibleContent>
                    </Collapsible>

                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </div>

    )
}