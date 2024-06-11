import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";
import { number } from 'zod';
const openaiApiKey = process.env.OPENAI_API_KEY;
const task ={
    type: "object",
    properties:{
        task: {
            type: "string",
            description: "Name of the Task"
        },
        brief: {
            type:"string",
            description: "A short resume of the task"
        },
        instructions: {
            type: "string",
            description: "Descripition of the task based on the topic"
        },
        maxpoints:{
            type: "number",
            description: "The default value is 100"
        },
        rubric: {
            type: "array",
            description: "Make a rubric of the tast to evaluete the submit of the users.",
            items:{
                type:"object",
                properties:{
                    criterion:{
                        type:"string",
                        description: "One of the criterions to evaluate the task"
                    },
                    points:{
                        type:"number",
                        description: "The points for this criterion of the total points of the task"
                    }
                }
            }
        },
        timeexp: {
            type: "number",
            descrition: "Time in minutes to do and submit the task"
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
    const { topic,nameTask, difficulty} = await request.json();
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Generate a detailed task for this topic "${topic}" and this difficulty ${difficulty}, and the name of the task is ${nameTask} and give me the rubric of the task, also give me your response in a Json format with this schema ${task}`,
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
