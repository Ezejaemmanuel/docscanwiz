import Navbar from '@/components/Navbar';
import './globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: 'DocScanWiz - Document Digitization',
  description: 'DocScanWiz uses advanced OCR technology to digitize your documents and extract text rapidly and accurately.',
  openGraph: {
    title: 'DocScanWiz - Document Digitization',
    description: 'DocScanWiz uses advanced OCR technology to digitize your documents and extract text rapidly and accurately.',
    url: 'https://www.docscanwiz.com',
    siteName: 'DocScanWiz',
    images: [
      {
        url: 'https://www.docscanwiz.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'DocScanWiz og image',
      }
    ]
  }
}

export default function RootLayout({ children }: Props) {

  return (
    <html lang="en">

      <head>
        <Navbar />
      </head>

      <body className={inter.className}>
        {children}
      </body>

    </html>
  );

}