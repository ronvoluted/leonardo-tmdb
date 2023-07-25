import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const title = 'Movies for the authenticated filmgoer';
const description = 'Leonardo Ai - TMDB';

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
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
