import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';

type Props = {
    params: { 
      course: string,
      topic: string,
      quiz: string,
      submit: string,
    }
};
export async function PATCH(request: NextRequest, { params }: Props) {
    const { course, topic, quiz, submit } = params;
  
    try {
      const data = await request.json();
  
      await dbConnect();
  
      try {
        const updateFields = data;
  
        // Construct the $set object dynamically based on the fields provided in the request body
        const updateObject: { [key: string]: any } = {};
        for (let key in updateFields) {
          updateObject[`topics.$.quizzes.$[quiz].submits.$[submit].${key}`] = updateFields[key];
        }
  
        const result = await Course.findOneAndUpdate(
          { _id: course, 'topics._id': topic },
          { $set: updateObject },
          { new: true, arrayFilters: [{ 'quiz._id': quiz }, { 'submit._id': submit }] }
        );
  
        if (!result) {
          return NextResponse.json({ message: 'Topic, Quiz, or Submit not found' }, { status: 404 });
        }
  
        return NextResponse.json({ message: 'Submit updated successfully', data: result });
      } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  