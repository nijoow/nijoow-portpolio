import ParticleLogoBox from '@/components/Immersive/ParticleLogoBoxDynamic';
import { AmbientBackground } from '@/components/Motion/AmbientBackground';
import CustomCursor from '@/components/Motion/CustomCursor';
import NavBar from '@/components/Navbar/NavBar';
import QueryProvider from '@/context/QueryProvider';
import Theme from '@/context/Theme';
import { PERSON_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
import { Analytics } from '@vercel/analytics/next';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
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
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    title: SITE_NAME,
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
    <html lang="ko" className="h-full w-full" suppressHydrationWarning>
      <body className={`${binggrae.variable} h-full w-full`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': PERSON_ID,
                  name: 'Lee Woo Jin',
                  alternateName: 'nijoow',
                  url: SITE_URL,
                  jobTitle: 'Frontend Developer',
                  description: SITE_DESCRIPTION,
                  sameAs: ['https://github.com/nijoow'],
                  knowsAbout: [
                    'Next.js',
                    'React',
                    'TypeScript',
                    'Three.js',
                    'Web 3D',
                    'Frontend',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  inLanguage: 'ko-KR',
                  author: { '@id': PERSON_ID },
                },
              ],
            }),
          }}
        />
        <NuqsAdapter>
          <QueryProvider>
            <LazyMotion features={domAnimation}>
              <MotionConfig reducedMotion="user">
                <Theme>
                  <AmbientBackground />
                  <CustomCursor />
                  <div className="relative flex min-h-screen w-full flex-col bg-transparent text-black transition-all duration-300 dark:text-white">
                    <NavBar />
                    <main className="mx-auto w-full max-w-4xl flex-auto px-4 pt-24 pb-24">
                      <ParticleLogoBox />
                      {children}
                    </main>
                    <footer className="mt-auto w-full border-t border-white/10">
                      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-3 px-4 py-7 sm:flex-row">
                        <span className="text-sm text-white/50">
                          &copy; {new Date().getFullYear()} Lee Woo Jin. All
                          Rights Reserved.
                        </span>
                        <div className="flex items-center gap-4 text-sm font-semibold text-white/60">
                          <a
                            href="https://github.com/nijoow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-white"
                          >
                            GitHub
                          </a>
                          <span className="text-white/20">|</span>
                          <a
                            href="mailto:nijoow1127@gmail.com"
                            className="transition-colors hover:text-white"
                          >
                            nijoow1127@gmail.com
                          </a>
                        </div>
                      </div>
                    </footer>
                  </div>
                </Theme>
              </MotionConfig>
            </LazyMotion>
          </QueryProvider>
        </NuqsAdapter>
        <Analytics />
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
