import type { User } from '@prisma/client';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';

import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { prisma } from '@prismaClient';
import AuthProvider from '$AuthProvider';
import ChakraProviders from '$ChakraProviders';
import UserProvider from '$UserProvider';
import Navbar from '$Navbar';

const title = 'Movies for the authenticated filmgoer';
const description = 'Leonardo TMDB';
const url = process.env.NEXT_PUBLIC_URL || 'https://leonardo-tmdb.vercel.app';

export const metadata: Metadata = {
  title,
  description,
  manifest: '/site.webmanifest',
  themeColor: 'black',
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  let serverUser: Auth.UserDetails | undefined;

  try {
    if (!session?.user || !session.user.email) {
      throw new Error('No session details found');
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    serverUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      jobTitle: user.job_title,
    };
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error querying user');
  }

  const cookieStore = cookies();

  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserProvider serverUser={serverUser}>
            <ChakraProviders cookies={cookieString}>
              <Navbar />

              {children}
            </ChakraProviders>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
