import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';

type Props = {
    params: { 
      course: string,
      topic: string,
      quiz: string
    }
};

export async function GET(request: NextRequest, { params }: Props) {
    try {
        await dbConnect();

        const { course, topic, quiz } = params;

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

        // Find the specific quiz by its ID
        const specificQuiz = quizzesData.find((quizData:any) => quizData._id.toString() === quiz);

        if (!specificQuiz) {
            return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
        }

        return NextResponse.json(specificQuiz);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        await dbConnect();

        const { course, topic, quiz } = params;

        const result = await Course.findOneAndUpdate(
            { 
                _id: course, 
                'topics._id': topic 
            },
            { 
                $pull: { 'topics.$.quizzes': { _id: quiz } } 
            },
            { new: true }
        );

        if (!result) {
            return NextResponse.json({ message: 'Topic or quiz not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Quiz deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// FALTA EL PUT

export async function PUT(request: NextRequest, { params }: Props) {
    const { course, topic, quiz } = params;
  
    try {
      const data = await request.json();
  
      await dbConnect();
  
      try {
        const updateFields = data; // Use data obtained from request.json()
  
        // Construct the $set object dynamically based on the fields provided in the request body
        const updateObject: { [key: string]: any } = {};
        for (let key in updateFields) {
          updateObject[`topics.$.quizzes.$[quiz].${key}`] = updateFields[key];
        }
  
        const result = await Course.findOneAndUpdate(
          { _id: course, 'topics._id': topic },
          { $set: updateObject },
          { new: true, arrayFilters: [{ 'quiz._id': quiz }] }
        );
  
        if (!result) {
          return NextResponse.json({ message: 'Topic or Quiz not found' }, { status: 404 });
        }
  
        return NextResponse.json({ message: 'Quiz updated successfully', data: result });
      } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  