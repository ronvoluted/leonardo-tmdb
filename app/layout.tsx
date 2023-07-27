import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';

import AuthProvider from '$AuthProvider';
import ChakraProviders from '$ChakraProviders';
import Navbar from '$Navbar';

const inter = Inter({ subsets: ['latin'] });
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();

  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ChakraProviders cookies={cookieString}>
            <Navbar />

            {children}
          </ChakraProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
