//Aun sin terminar
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";
const openaiApiKey = process.env.OPENAI_API_KEY;
const topicSchema = {
    type: "object",
    properties: {
        topic: {
            type: "string",
            description: "Name of the Topic"
        },
        brief: {
            type: "string",
            description: "Description and explanation of the topic"
        },
        contents: {
            type: "array",
            description: "Here is where the content of the topic will be saved",
            items: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        description: "The title of the content"
                    },
                    description: {
                        type: "string",
                        description: "The description of the title of the content"
                    },
                    sections: {
                        type: "array",
                        description: "The sections of the content",
                        items: {
                            type: "object",
                            properties: {
                                subtitle: {
                                    type: "string",
                                    description: "The subtitle of the content"
                                },
                                content: {
                                    type: "string",
                                    description: "Detailed content for a curriculum about the topic"
                                }
                            }
                        }
                    },
                    sources: {
                        type: "array",
                        description: "External links to resources that can improve the knowledge",
                        items: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "The name of the external resource"
                                },
                                url: {
                                    type: "string",
                                    description: "The URL of the external resource"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
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
                    content: `Generate a detailed topic for a study plan for this course "${course}" abaout this topic ${topicPassed}, make make the content of the topic and provide two sources of information for example websites that explains this topic, the level of detail that you need is this ${detail} give me your response in a Json format with this schema ${topicSchema}`,
                }
            ],
            model: "gpt-4o",
            functions:[
                {name: "get-course-data","parameters": topicSchema}
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
