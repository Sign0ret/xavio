import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';

type Props = {
    params: { 
      course: string,
      topic: string,
      task: string
    }
};

export async function GET(request: NextRequest, { params }: Props) {
    try {
        await dbConnect();

        const { course, topic, task } = params;

        const pipeline = [
            { $match: { _id: new mongoose.Types.ObjectId(course) } },
            { $unwind: '$topics' },
            { $match: { 'topics._id': new mongoose.Types.ObjectId(topic) } },
            { $project: { 'topics.tasks': 1 } } // Project only the tasks field
        ];

        const result = await Course.aggregate(pipeline).exec();

        if (result.length === 0) {
            return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
        }

        const tasksData = result[0].topics.tasks;

        // Find the specific quiz by its ID
        const specificTask = tasksData.find((taskData:any) => taskData._id.toString() === task);

        if (!specificTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json(specificTask);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        await dbConnect();

        const { course, topic, task } = params;

        const result = await Course.findOneAndUpdate(
            { 
                _id: course, 
                'topics._id': topic 
            },
            { 
                $pull: { 'topics.$.tasks': { _id: task } } 
            },
            { new: true }
        );

        if (!result) {
            return NextResponse.json({ message: 'Topic or task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// FALTA EL PUT

export async function PATCH(request: NextRequest, { params }: Props) {
    const { course, topic, task } = params;
  
    try {
      const data = await request.json();
  
      await dbConnect();
  
      try {
        const updateFields = data; // Use data obtained from request.json()
  
        // Construct the $set object dynamically based on the fields provided in the request body
        const updateObject: { [key: string]: any } = {};
        for (let key in updateFields) {
          updateObject[`topics.$.tasks.$[task].${key}`] = updateFields[key];
        }
  
        const result = await Course.findOneAndUpdate(
          { _id: course, 'topics._id': topic },
          { $set: updateObject },
          { new: true, arrayFilters: [{ 'task._id': task }] }
        );
  
        if (!result) {
          return NextResponse.json({ message: 'Topic or Task not found' }, { status: 404 });
        }
  
        return NextResponse.json({ message: 'Task updated successfully', data: result });
      } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  