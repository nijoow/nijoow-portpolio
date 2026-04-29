import { AmbientBackground } from '@/components/Motion/AmbientBackground';
import CustomCursor from '@/components/Motion/CustomCursor';
import NavBar from '@/components/Navbar/NavBar';
import ThreeDynamic from '@/components/Three/ThreeDynamic';
import Redirect from '@/context/Redirect';
import Theme from '@/context/Theme';
import { Analytics } from '@vercel/analytics/next';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const binggrae = localFont({
  src: [
    {
      path: '../font/Binggrae.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/Binggrae-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-binggrae',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'nijoow | portfolio',
  description: 'Welcome to nijoow`s portfolio!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Redirect>
      <html lang="ko" className="h-full w-full" suppressHydrationWarning>
        <body className={`${binggrae.variable} h-full w-full`}>
          <LazyMotion features={domAnimation}>
            <Theme>
              <AmbientBackground />
              <CustomCursor />
              <div className="relative flex min-h-screen w-full flex-col bg-transparent text-black transition-all duration-300 dark:text-white">
                <NavBar />
                <main className="mx-auto w-full max-w-2xl flex-auto px-3 pt-10 pb-20">
                  <ThreeDynamic />
                  {children}
                </main>
                <footer
                  className={
                    'flex w-full items-center justify-center py-5 text-sm'
                  }
                >
                  &copy; {new Date().getFullYear()} Lee Woo Jin. All Rights
                  Reserved.
                </footer>
              </div>
            </Theme>
          </LazyMotion>
          <Analytics />
          <Toaster position="bottom-center" reverseOrder={false} />
        </body>
      </html>
    </Redirect>
  );
}
