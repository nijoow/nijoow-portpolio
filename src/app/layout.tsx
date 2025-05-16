import NavBar from '@/components/Navbar/NavBar';
import Three from '@/components/Three/Three';
import Recoil from '@/context/Recoil';
import Redirect from '@/context/Redirect';
import Theme from '@/context/Theme';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import './globals.css';

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
        <body className="h-full w-full">
          <Theme>
            <Recoil>
              <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-purple-50 text-black transition-all duration-300 dark:bg-gray-darker dark:text-purple-50">
                <NavBar />
                <div className="mx-auto w-full max-w-2xl flex-auto px-3 pt-12">
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
            </Recoil>
          </Theme>
        </body>
        <GoogleAnalytics gaId="G-5QJWDNZCYK" />
      </html>
    </Redirect>
  );
}
