import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export function GET() {
    dbConnect();
    return NextResponse.json({
        message: "hello world!",
    });
}