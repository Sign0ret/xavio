import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: { 
      course: string,
   }
};

export async function GET(request: NextRequest, { params }: Props) {
    try {
        dbConnect();
        const objectFound = await Course.findById(params.course).select('course');

        if (!objectFound) {
            return NextResponse.json({
                message: 'Task not found',
            }, {
                status: 404
            });
        }
    
        return NextResponse.json(objectFound);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400
        });
    }
}
