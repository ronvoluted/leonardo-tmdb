import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';

import { ChakraProviders } from '$ChakraProviders';
import Navbar from '$Navbar';

const inter = Inter({ subsets: ['latin'] });
const title = 'Movies for the authenticated filmgoer';
const description = 'Leonardo TMDB';

export const metadata: Metadata = {
  title,
  description,
  manifest: '/site.webmanifest',
  themeColor: 'black',
  openGraph: {
    title,
    description,
    url: 'https:/leonardo-tmdb.vercel.app',
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
        <ChakraProviders cookies={cookieString}>
          <Navbar />

          {children}
        </ChakraProviders>
      </body>
    </html>
  );
}
