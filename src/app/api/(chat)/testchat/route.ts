import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: any) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "what is a endpoint" }],
            model: "gpt-4o",
        });        
        if(!chatCompletion) return NextResponse.json({
            message: 'Completion not found',
        }, {
            status: 404
        })
        return NextResponse.json(chatCompletion);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}