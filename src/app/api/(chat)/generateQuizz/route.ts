import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";
const openaiApiKey = process.env.OPENAI_API_KEY;
const quizz ={
    type: "object",
    properties:{
        quiz: {
            type: "string",
            description: "Name of the Quizz"
        },
        maxpoints:{
            type:"number",
            description: "Give the total points of this quizz based on the difficulty and the the number of questions, the default value is 100"
        },
        instructions: {
            type: "string",
            description: "Descripition of the quizz based on the topic"
        },
        structure:{
            type: "array",
            description: "Get all the questions and their possible options of the quizz based on the number of questions and topic",
            items:{
                type:"object",
                properties:{
                    question:{
                        type:"string",
                        description: "The question"
                    },
                    points:{
                        type:"number",
                        description:"The points of this question based on the total points of the task"
                    },
                    options:{
                        type:"array",
                        description: "All the possible answe options",
                        items:{
                            type:"object",
                            properties:{
                                option:{
                                    type:"string",
                                    description: "One of the possible answer"
                                },
                                iscorrect:{
                                    type:"boolean",
                                    description:"This parameter  indicates if this option it the correct answer or not"
                                }
                            }
                        }
                    }
                }
            }
        },
        timelimit:{
            type:"number",
            description: "The max minutes that th user has to response the quizz"
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
    const { topic, numQuestions, difficulty} = await request.json();
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Generate a detailed quizz plan for this topic "${topic}" with ${numQuestions} and this difficulty ${difficulty} questions and give me your response in a Json format with this schema ${quizz}`,
                }
            ],
            model: "gpt-4o",
            functions:[
                {name: "get-course-data","parameters": quizz}
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
