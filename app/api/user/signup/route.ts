import { NextRequest, NextResponse } from 'next/server';
import { hash } from '@hash';

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

  const formData = await req.formData();
  const credentials = <{ email?: string; password?: string }>Object.fromEntries(formData.entries());

  if (!credentials?.email || !credentials?.password) {
    return NextResponse.json(
      {
        success: false,
        message: `No ${!credentials?.email ? 'email' : 'password'} submitted`,
      },
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      }
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    if (user) {
      const searchParam: Auth.SignUpSearchParam = 'signup=email-exists';

      return new NextResponse(JSON.stringify({ success: false, message: 'User with submitted email already exists' }), {
        status: 303,
        headers: { Location: `/?${searchParam}` },
      });
    }

    const hashedPassword = await hash(credentials.password);

    if (!hashedPassword || !hashedPassword.derivedKey || !hashedPassword.salt) {
      return NextResponse.json(
        { success: false, message: `Could not process credentials` },
        {
          status: 500,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword.derivedKey,
        salt: hashedPassword.salt,
      },
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 303,
      headers: {
        location: '/movies',
      },
    });
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error signing up');

    return null;
  }
}
