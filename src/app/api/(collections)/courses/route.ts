import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

export async function GET()  {
    dbConnect();
    const objects = await Course.find()
    return NextResponse.json(objects);
}

export async function POST(request: any) {
    try {
        const data = await request.json();
        const newObject = new Course(data);
        const savedObject = await newObject.save();
        return NextResponse.json(savedObject);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}