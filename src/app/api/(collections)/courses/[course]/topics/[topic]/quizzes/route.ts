import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';


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

// FALTA EL POST