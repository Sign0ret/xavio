import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: { 
        user: string
    }
};

export async function GET(request: NextRequest, { params }: Props)  {
    try {
        dbConnect();
        const { user } = params;
        
        const objectsFound = await Course.find({
            'members.member': user // Assuming user ID is stored in `_id` field
        });

        if (!objectsFound || objectsFound.length === 0) {
            return NextResponse.json({
                message: 'No courses found for this user',
            }, {
                status: 404
            });
        }

        return NextResponse.json(objectsFound);
    } catch(error: any) {
        return NextResponse.json(error.message, {
            status: 400
        });
    }
}
