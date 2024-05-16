import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();

    try {
        const messages = await Message.find();
        console.log(messages)
        return NextResponse.json(messages);
    } catch(err: any) {
        return NextResponse.json({ error: err.message });
    }

}