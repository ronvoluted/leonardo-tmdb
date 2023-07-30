import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { prisma } from '@prismaClient';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token || !token.email) {
      return NextResponse.json(
        {
          success: false,
          message: !token ? 'No token received' : 'No email provided in token',
        },
        {
          status: 400,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'No user found',
        },
        {
          status: 404,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          jobTitle: user.job_title,
        },
      },
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }
    );
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error querying user');

    return NextResponse.json(
      {
        success: false,
        message: 'Error querying user',
      },
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      }
    );
  }
}
