import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: { 
      course:  string,
   }
  };
  
export async function GET(request: NextRequest, { params }: Props)  {
    try {
        dbConnect()
        const objectFound = await Course.findById(params.course)

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

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const objectDeleted = await Course.findByIdAndDelete(params.course)
        if (!objectDeleted)
            return NextResponse.json({
                message: 'Course not found',
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

export async function PATCH(request: NextRequest, { params }: Props) { // This endpoint handles partial updates
    try {
        const data = await request.json()
        const objectUpdated = await Course.findByIdAndUpdate(params.course, data, {
            new: true,
            runValidators: true // Ensure the update respects the schema validation
        });
        if (!objectUpdated) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }
        return NextResponse.json(objectUpdated);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}