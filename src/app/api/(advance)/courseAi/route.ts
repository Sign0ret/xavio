import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CourseAI from "@/models/Course_Ai";

export async function GET()  {
    dbConnect();
    const objects = await CourseAI.find()
    return NextResponse.json(objects);
}

export async function POST(request: any) {
    try {
        const data = await request.json();
        console.log(data);
        const newObject = new CourseAI(data);
        const savedObject = await newObject.save();
        return NextResponse.json(savedObject);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}