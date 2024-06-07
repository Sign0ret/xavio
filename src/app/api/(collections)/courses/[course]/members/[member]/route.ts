import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: { 
      course:  string,
      member: string
   }
};

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        // Find the course by its ID
        const course = await Course.findById(params.course);
        
        if (!course) {
            return NextResponse.json({
                message: 'Course not found',
            }, {
                status: 404
            });
        }
        
        // Remove the member from the members array
// @ts-ignore
        course.members = course.members.filter(member => member.member.toString() !== params.member);

        // Save the updated course
        await course.save();

        return NextResponse.json({ message: 'Member removed from the course' });
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400
        });
    }
}
