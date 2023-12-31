import Navbar from '@/components/Navbar';

import './globals.css';

import { Inter } from 'next/font/google';
import ContactUs from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '../utils/provider';
interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: 'DocScanWiz - Document Digitization',
  description: 'DocScanWiz uses advanced OCR technology to digitize your documents and extract text rapidly and accurately.',
  // openGraph: {
  //   title: 'DocScanWiz - Document Digitization',
  //   description: 'DocScanWiz uses advanced OCR technology to digitize your documents and extract text rapidly and accurately.',
  //   url: 'https://www.docscanwiz.vercel.app',
  //   siteName: 'DocScanWiz',
  //   images: [
  //     {
  //       url: 'https://www.docscanwiz.vercel.app/og-image.jpg',
  //       width: 800,
  //       height: 600,
  //       alt: 'DocScanWiz og image',
  //     }
  //   ]
  // }
}

export default function RootLayout({ children }: Props) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <div className='dark:bg-black bg-slate-50'>
                <div className="fixed top-0 left-0 right-0 z-10">
                  <Navbar />
                </div >
                <div className='pt-24'>
                  {children}
                </div>
                <ContactUs />
              </div>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );

}