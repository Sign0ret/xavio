import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;
const course_advance_schema ={
    type: "object",
    properties:{
        course: {
            type: "string",
            description: "Name of the course"
        },
        description_course: {
            type: "string",
            description: "Descripition of the course based on the topics"
        },
        topics:{
            type: "array",
            description: "Get all the names of the mor relevant topic and if its necesary create topics",
            items:{
                type:"object",
                properties:{
                    name_topic:{
                        type:"string",
                        description: "The name of the topics"
                    },
                    content:{
                        type:"string",
                        description: "A resume of the most important things of the topic"
                    }
                }
            }
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
    const { courseName, numTopics, numQuizzes, numTasks, relevantTopics } = await request.json();
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Generate a detailed course plan for "${courseName}" with ${numTopics} topics, ${numQuizzes} quizzes, and ${numTasks} tasks. The topics should cover: ${relevantTopics}. and give me your response in a Json format with this schema ${course_advance_schema}`,
                }
            ],
            model: "gpt-4o",
            functions:[
                {name: "get-course-data","parameters": course_advance_schema}
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
