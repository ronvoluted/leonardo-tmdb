import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@prismaClient';

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json(
      { success: false, message: 'No body received' },
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      }
    );
  }

  try {
    const userDetails = await req.json();

    console.log({ userDetails });

    const userWithExistingUsername = await prisma.user.findFirst({
      where: {
        username: userDetails.username,
        NOT: { email: userDetails.email },
      },
    });

    if (userWithExistingUsername) {
      return NextResponse.json(
        { success: false, message: 'User with username already exists' },
        {
          status: 409,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        email: userDetails.email,
      },
      data: {
        email: userDetails.email,
        username: userDetails.username,
        job_title: userDetails.jobTitle,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          email: updateUser.email,
          username: updateUser.username,
          jobTitle: updateUser.job_title,
        },
      },
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }
    );
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error updating user');

    return null;
  }
}
