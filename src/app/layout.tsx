import NavBar from '@/components/Navbar/NavBar'
import Three from '@/components/_common/three/Three'
import Motion from '@/context/Motion'
import Theme from '@/context/Theme'
import { Metadata } from 'next'
import './globals.css'

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
    <html lang="en" className="w-full h-full">
      <body className="w-full h-full">
        <div className="flex flex-col w-full min-h-screen overflow-x-hidden text-black transition-all duration-300 bg-purple-50 dark:bg-gray-darker dark:text-purple-50">
          <NavBar />
          <div className="flex-auto w-full max-w-2xl px-3 pt-12 mx-auto">
            <Three />
            <Motion>
              <Theme>{children}</Theme>
            </Motion>
          </div>
        </div>
      </body>
    </html>
  )
}
