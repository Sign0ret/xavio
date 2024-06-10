import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';
import { IQuizDocument } from '@/models/Quiz'; // Adjust the import path based on your project structure

type Props = {
    params: { 
      course:  string
      topic: string
   }
  };

export async function GET(request: NextRequest, { params }: Props) {
    try {
        await dbConnect();

        const { course, topic } = params;

        const pipeline = [
            { $match: { _id: new mongoose.Types.ObjectId(course) } },
            { $unwind: '$topics' },
            { $match: { 'topics._id': new mongoose.Types.ObjectId(topic) } },
            { $project: { 'topics.quizzes': 1 } } // Project only the quizzes field
        ];

        const result = await Course.aggregate(pipeline).exec();

        if (result.length === 0) {
            return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
        }

        const quizzesData = result[0].topics.quizzes;

        return NextResponse.json(quizzesData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest, { params }: Props) {
    try {
      await dbConnect();
  
      const { course, topic } = params;
      const data = await request.json();
      console.log("dataQuiz:",data.structure[0].options)
  
      // Validate data structure here if needed
      /* const { quiz, structure, submits } = data; */

      // Find the course and update the topics array with the new quiz
      const updatedCourse = await Course.findOneAndUpdate(
        { _id: course, 'topics._id': topic },
        { $push: { 'topics.$.quizzes': data } },
        { new: true, runValidators: true }
      );
  
      if (!updatedCourse) {
        return NextResponse.json({ message: 'Course or topic not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Quiz added successfully', data: updatedCourse });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }