import { AmbientBackground } from '@/components/Motion/AmbientBackground';
import CustomCursor from '@/components/Motion/CustomCursor';
import NavBar from '@/components/Navbar/NavBar';
import ThreeDynamic from '@/components/Three/ThreeDynamic';
import QueryProvider from '@/context/QueryProvider';
import Redirect from '@/context/Redirect';
import Theme from '@/context/Theme';
import { Analytics } from '@vercel/analytics/next';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Metadata, Viewport } from 'next';
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

const SITE_URL = 'https://nijoow-portfolio.vercel.app';
const SITE_DESCRIPTION =
  '프론트엔드 개발자 이우진(nijoow)의 포트폴리오. Next.js·TypeScript·웹 3D 기반 인터랙티브 웹 작업물을 소개합니다.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'nijoow | portfolio',
    template: '%s | nijoow',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'nijoow',
    '이우진',
    '포트폴리오',
    '프론트엔드',
    'Frontend',
    'Next.js',
    'React',
    'TypeScript',
    '웹 3D',
    'Three.js',
  ],
  authors: [{ name: 'Lee Woo Jin', url: 'https://github.com/nijoow' }],
  creator: 'Lee Woo Jin',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: 'nijoow | portfolio',
    title: 'nijoow | portfolio',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nijoow | portfolio',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
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
          <QueryProvider>
            <LazyMotion features={domAnimation}>
              <MotionConfig reducedMotion="user">
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
              </MotionConfig>
            </LazyMotion>
          </QueryProvider>
          <Analytics />
          <Toaster position="bottom-center" reverseOrder={false} />
        </body>
      </html>
    </Redirect>
  );
}
