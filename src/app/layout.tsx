import NavBar from '@/components/Navbar/NavBar'
import Three from '@/components/Three/Three'
import Theme from '@/context/Theme'
import { Metadata } from 'next'
import './globals.css'
import Recoil from '@/context/Recoil'
import Redirect from '@/context/Redirect'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: 'nijoow | portfolio',
  description: 'Welcome to nijoow`s portfolio!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Redirect>
      <html lang="en" className="w-full h-full" suppressHydrationWarning>
        <body className="w-full h-full">
          <Theme>
            <Recoil>
              <div className="transition-all duration-300 flex flex-col w-full min-h-screen overflow-x-hidden text-black bg-purple-50 dark:bg-gray-darker dark:text-purple-50">
                <NavBar />
                <div className="flex-auto w-full max-w-2xl px-3 pt-12 mx-auto">
                  <Three />
                  {children}
                </div>
                <footer
                  className={
                    'text-sm py-5 w-full flex items-center justify-center'
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
  )
}
