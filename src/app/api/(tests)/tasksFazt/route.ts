import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TaskFazt from "@/models/TaskFazt";

export async function GET()  {
    dbConnect();
    const objects = await TaskFazt.find()
    return NextResponse.json(objects);
}

export async function POST(request: any) {
    try {
        const data = await request.json()
        const newObject = new TaskFazt(data)
        const savedObject = await newObject.save()
        return NextResponse.json(savedObject);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}