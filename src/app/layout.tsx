import { AmbientBackground } from '@/components/Motion/AmbientBackground';
import CustomCursor from '@/components/Motion/CustomCursor';
import NavBar from '@/components/Navbar/NavBar';
import Three from '@/components/Three/Three';
import Redirect from '@/context/Redirect';
import Theme from '@/context/Theme';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const mPlusRounded1c = localFont({
  src: [
    {
      path: '../font/MPLUSRounded1c-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../font/MPLUSRounded1c-Thin.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../font/MPLUSRounded1c-Light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/MPLUSRounded1c-Regular.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../font/MPLUSRounded1c-Medium.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../font/MPLUSRounded1c-Bold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../font/MPLUSRounded1c-ExtraBold.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-m-plus-rounded-1c',
});

const nanumSquareRound = localFont({
  src: [
    {
      path: '../font/NanumSquareRoundL.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../font/NanumSquareRoundR.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/NanumSquareRoundB.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../font/NanumSquareRoundEB.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-nanum-square-round',
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
      <html lang="en" className="h-full w-full" suppressHydrationWarning>
        <body
          className={`${mPlusRounded1c.variable} ${nanumSquareRound.variable} h-full w-full`}
        >
          <Theme>
            <AmbientBackground />
            <CustomCursor />
            <div className="relative flex min-h-screen w-full flex-col bg-transparent text-black transition-all duration-300 dark:text-white">
              <NavBar />
              <div className="mx-auto w-full max-w-2xl flex-auto px-3 pt-10 pb-20">
                <Three />
                {children}
              </div>
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
          <GoogleAnalytics gaId="G-5QJWDNZCYK" />
          <Analytics />
          <Toaster position="bottom-center" reverseOrder={false} />
        </body>
      </html>
    </Redirect>
  );
}
