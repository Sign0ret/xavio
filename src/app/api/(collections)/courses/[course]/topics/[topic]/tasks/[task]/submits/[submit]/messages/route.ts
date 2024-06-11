import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import mongoose from 'mongoose';

type Props = {
    params: {
        course: string;
        topic: string;
        task: string;
        submit: string;
    };
};

export async function POST(request: NextRequest, { params }: Props) {
    try {
        await dbConnect();

        const { course, topic, task, submit } = params;
        const data = await request.json();

        // Validate data structure here if needed
        /* const { structure, response } = data; */

        // Find the course and update the specified submit within the task
        const updatedCourse = await Course.findOneAndUpdate(
            { _id: course, 'topics._id': topic, 'topics.tasks._id': task, 'topics.tasks.submits._id': submit },
            { $push: { 'topics.$[topic].tasks.$[task].submits.$[submit].messages': data } },
            { new: true, runValidators: true, arrayFilters: [{ 'topic._id': topic }, { 'task._id': task }, { 'submit._id': submit }] }
        );

        if (!updatedCourse) {
            return NextResponse.json({ message: 'Course, topic, task, or submit not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Message added successfully', data: updatedCourse });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}