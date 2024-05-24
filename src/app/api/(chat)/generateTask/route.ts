import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";
const openaiApiKey = process.env.OPENAI_API_KEY;
const task ={
    type: "object",
    properties:{
        task: {
            type: "string",
            description: "Name of the Task"
        },
        instructions: {
            type: "string",
            description: "Descripition of the task based on the topic"
        },
        rubric: {
            type: "string",
            description: "Make a rubric of the tast to evaluete the submit of the users."
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
    const { topic, difficulty} = await request.json();
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Generate a detailed task for this topic "${topic}" and this difficulty ${difficulty} and give me the rubric of the task, also give me your response in a Json format with this schema ${task}`,
                }
            ],
            model: "gpt-4o",
            functions:[
                {name: "get-task-data","parameters": task}
            ],
            function_call:{name:"get-task-data"},
            temperature:0, 
        });
       
        // @ts-ignore
        const functionResponse = JSON.parse(chatCompletion.choices[0].message.function_call.arguments);

        return NextResponse.json(functionResponse);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
