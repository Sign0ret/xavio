//Aun sin terminar
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";
const openaiApiKey = process.env.OPENAI_API_KEY;
const responseSchema = {
    type: "object",
    properties: {
        Question: {
            type: "string",
            description: "Question that the user ask"
        },
        response: {
            type: "string",
            description: "The response to the question thatbased on the context"
        },
    }
};
if (!openaiApiKey) {
    throw new Error('OpenAI API key not provided');
}

const openai = new OpenAI({
    apiKey: openaiApiKey,
});

export async function POST(request: Request,res:Response) {
    const {question, context} = await request.json();
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Generate a response for this question ${question} based on this context "${context}", the context is very long but just keep it in mind to response de question, give me your response in a Json format with this schema ${responseSchema}`,
                }
            ],
            model: "gpt-3.5-turbo",
            functions:[
                {name: "get-course-data","parameters": responseSchema}
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
