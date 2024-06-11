import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';

type Props = {
  params: { 
    search:  string,
 }
};

export async function GET(request: NextRequest, { params }: Props) {
  const search = params.search;

  try {
    await dbConnect();

    // Perform aggregation query
    const results = await Course.aggregate([
      {
        $search: {
          index: 'searchCourses',
          text: {
            query: search,
            path: 'course',
            fuzzy: {
              maxEdits: 2,
              prefixLength: 2,
              maxExpansions: 100,
            },
          },
        },
      },
      {
        $limit: 10,
      }
    ]);

    // Return results
    return NextResponse.json(results, {
      status: 200
    });
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({
      error: 'Internal Server Error'
    }, {
      status: 500
    });
  }
}
