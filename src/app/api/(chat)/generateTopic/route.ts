//Aun sin terminar
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";
const openaiApiKey = process.env.OPENAI_API_KEY;
const topic ={
    type: "object",
    properties:{
        topic: {
            type: "string",
            description: "Name of the Topic"
        },
        brief: {
            type: "string",
            description: "Description and explanation of the topic"
        }
    }
}
if (!openaiApiKey) {
    throw new Error('OpenAI API key not provided');
}

const openai = new OpenAI({
    apiKey: openaiApiKey,
});

export async function POST(request: Request,res:Response) {
    const { course, detail, topicPassed} = await request.json();
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Generate a detailed topic for a study plan for this course "${course}" , make a PDF of the topic and provide two sources of information for example websites that explains this topic, the level of detail that you need is this ${detail} give me your response in a Json format with this schema ${topicPassed}`,
                }
            ],
            model: "gpt-4o",
            functions:[
                {name: "get-course-data","parameters": topic}
            ],
            function_call:{name:"get-course-data"},
            temperature:0, 
        });
       
        // @ts-ignore
        const functionResponse = JSON.parse(chatCompletion.choices[0].message.function_call.arguments);

        return NextResponse.json(functionResponse);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
