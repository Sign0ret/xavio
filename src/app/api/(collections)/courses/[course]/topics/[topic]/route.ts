import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';

type Props = {
    params: {
        course: string,
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
            { $project: { 'topics': 1 } }
        ];

        const result = await Course.aggregate(pipeline).exec();

        if (result.length === 0) {
            return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
        }

        const topicData = result[0].topics;

        return NextResponse.json(topicData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        await dbConnect();

        const { course, topic } = params;

        const result = await Course.findOneAndUpdate(
            { _id: course },
            { $pull: { topics: { _id: topic } } },
            { new: true }
        );

        if (!result) {
            return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Topic deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// CREO QUE NO FUNCIONA EL PUT

export async function PUT(request: NextRequest, { params }: Props) {
    const { course, topic } = params;
  
    try {
      const data = await request.json();
  
      await dbConnect();
  
      try {
        const updateFields = data; // Use data obtained from request.json()
  
        // Construct the $set object dynamically based on the fields provided in the request body
        const updateObject: { [key: string]: any } = {};
        for (let key in updateFields) {
          updateObject[`topics.$.${key}`] = updateFields[key];
        }
  
        const result = await Course.findOneAndUpdate(
          { _id: course, 'topics._id': topic },
          { $set: updateObject },
          { new: true }
        );
  
        if (!result) {
          return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
        }
  
        return NextResponse.json({ message: 'Topic updated successfully', data: result });
      } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }