import dbConnect from "@/lib/dbConnect";
import TaskFazt from "@/models/TaskFazt";
import { NextResponse } from "next/server";

type Props = {
    params: { 
      id:  string,
   }
  };
  

export async function GET(request: any, { params }: Props)  {
    try {
        dbConnect()
        const taskFound = await TaskFazt.findById(params.id)

        if(!taskFound) return NextResponse.json({
            message: 'Task not found',
        }, {
            status: 404
        })
    
        return NextResponse.json(taskFound);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function DELETE(request: any, { params }: Props) {
    try {
        const taskDeleted = await TaskFazt.findByIdAndDelete(params.id)
        if (!taskDeleted)
            return NextResponse.json({
                message: 'Task not found',
            }, {
                status: 404
            })
        return NextResponse.json(taskDeleted);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function PUT(request: any, { params }: Props) {
    try {
        const data = await request.json()
        const taskUpdated = await TaskFazt.findByIdAndUpdate(params.id, data, {
            new: true
        })
        return NextResponse.json(taskUpdated);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}