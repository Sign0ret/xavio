import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TaskFazt from "@/models/TaskFazt";

export async function GET()  {
    dbConnect();
    const tasks = await TaskFazt.find()
    return NextResponse.json(tasks);
}

export async function POST(request: any) {
    try {
        const data = await request.json()
        const newTask = new TaskFazt(data)
        const savedTask = await newTask.save()
        return NextResponse.json(savedTask);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}