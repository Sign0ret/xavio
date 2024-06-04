import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

type Props = {
    params: { 
      course:  string
   }
  };

export async function GET(request: NextRequest, { params }: Props)  {
try {
    dbConnect()
    const objectFound = await Course.findById(params.course, { topics: 1 });

    if(!objectFound) return NextResponse.json({
        message: 'Topic not found',
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

export async function POST(request: any, { params }: Props) {
    try {
        const data = await request.json()
        const objectFound = await Course.findById(params.course);
        if(!objectFound) return NextResponse.json({
            message: 'Task not found',
        }, {
            status: 404
        })
        objectFound.topics.push(data);
        //console.log(data)
        const savedObject = await objectFound.save();
        return NextResponse.json(savedObject);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}