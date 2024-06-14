import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';// Ensure prisma client is correctly configured
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

type Props = {
  params: { 
    course: string;
  };
};

export async function GET(request: NextRequest, { params }: Props)  {
  try {
    await dbConnect();
    const course = await Course.findById(params.course, { members: 1 });

    if (!course) {
      return NextResponse.json({
        message: 'Course not found',
      }, {
        status: 404
      });
    }

    // Assuming `members` is an array of objects with `_id`, `member`, and `admin` attributes
    const memberIds = course.members.map((member: { member: string }) => member.member);

    // Fetch user names using Prisma
    const users = await db.user.findMany({
      where: {
        id: {
          in: memberIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Combine the member info with user info
    const membersWithNames = course.members.map((member: { member: string; admin: boolean; _id: string }) => {
      const user = users.find(u => u.id === member.member);
      return {
        _id: member._id,
        member: member.member,
        admin: member.admin,
        name: user ? user.name : null,
      };
    });

    return NextResponse.json(membersWithNames);
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
    }, {
      status: 400
    });
  }
}
