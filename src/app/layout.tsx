import { AmbientBackground } from '@/components/Motion/AmbientBackground';
import CustomCursor from '@/components/Motion/CustomCursor';
import NavBar from '@/components/Navbar/NavBar';
import ThreeDynamic from '@/components/Three/ThreeDynamic';
import Redirect from '@/context/Redirect';
import Theme from '@/context/Theme';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  variable: '--font-m-plus-rounded-1c',
  display: 'swap',
});

const nanumSquareRound = localFont({
  src: [
    {
      path: '../font/NanumSquareRoundR.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../font/NanumSquareRoundB.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/NanumSquareRoundEB.ttf',
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
          className={`${nanumSquareRound.variable} ${mPlusRounded1c.variable} h-full w-full`}
        >
          <Theme>
            <AmbientBackground />
            <CustomCursor />
            <div className="relative flex min-h-screen w-full flex-col bg-transparent text-black transition-all duration-300 dark:text-white">
              <NavBar />
              <div className="mx-auto w-full max-w-2xl flex-auto px-3 pt-10 pb-20">
                <ThreeDynamic />
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
