import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';

type Props = {
    params: { 
      course: string,
      topic: string,
      quiz: string,
    }
};

export async function POST(request: NextRequest, { params }: Props) {
    try {
      await dbConnect();
  
      const { course, topic, quiz } = params;
      const data = await request.json();
  
      // Validate data structure here if needed
      /* const { structure, response } = data; */
  
      // Find the course and update the quizzes array with the new submit
      const updatedCourse = await Course.findOneAndUpdate(
        { _id: course, 'topics._id': topic, 'topics.quizzes._id': quiz },
        { $push: { 'topics.$.quizzes.$[quiz].submits': data } },
        { new: true, runValidators: true, arrayFilters: [{ 'quiz._id': quiz }] }
      );
  
      if (!updatedCourse) {
        return NextResponse.json({ message: 'Course, topic, or quiz not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Submit added successfully', data: updatedCourse });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  