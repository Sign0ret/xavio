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
        const objectFound = await TaskFazt.findById(params.id)

        if(!objectFound) return NextResponse.json({
            message: 'Task not found',
        }, {
            status: 404
        })
    
        return NextResponse.json(objectFound);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function DELETE(request: any, { params }: Props) {
    try {
        const objectDeleted = await TaskFazt.findByIdAndDelete(params.id)
        if (!objectDeleted)
            return NextResponse.json({
                message: 'Task not found',
            }, {
                status: 404
            })
        return NextResponse.json(objectDeleted);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function PUT(request: any, { params }: Props) {
    try {
        const data = await request.json()
        const objectUpdated = await TaskFazt.findByIdAndUpdate(params.id, data, {
            new: true
        })
        return NextResponse.json(objectUpdated);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}