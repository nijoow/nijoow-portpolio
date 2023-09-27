'use client'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import { useEffect, useState } from 'react'
import { MdDarkMode, MdWbSunny } from 'react-icons/md'
import { CgDarkMode } from 'react-icons/cg'
import NavToggle from '@/components/Navbar/NavToggle'
import { useTheme } from 'next-themes'
import NavListItem from './NavListItem'

const themeIcon = {
  dark: (
    <MdWbSunny
      size={20}
      className="group-hover:rotate-[30deg] group-hover:scale-110 transition-all duration-300"
    />
  ),
  light: (
    <MdDarkMode
      size={20}
      className="group-hover:rotate-[30deg] group-hover:scale-110 transition-all duration-300"
    />
  ),
}

const navList = [
  { text: 'Home', url: '/' },
  { text: 'Skills', url: '/skills' },
  { text: 'Works', url: '/works' },
]

export default function NavBar() {
  // hooks
  const { setTheme, resolvedTheme: theme } = useTheme()

  // useState
  const [mounted, setMounted] = useState(false)
  const [isNavShow, setIsNavShow] = useState(true)

  // useEffect
  useEffect(() => {
    setMounted(true)
  }, [])

  // function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav
      className={`transition-all duration-300 h-12 w-full fixed z-50 shadow-lg bg-purple-light dark:bg-gray-dark dark:shadow-white/10 `}
    >
      <div className={`px-3 max-w-2xl h-12 flex w-full mx-auto items-center `}>
        <Link href="/" className="flex items-center gap-2 font-semibold group">
          <Logo
            width={80}
            height={50}
            className="group-hover:rotate-[5deg] group-hover:scale-[1.2] transition-transform duration-300"
          />
          <span
            className={`bg-gradient-to-br from-purple-medium bg-clip-text text-transparent to-purple-darker dark:from-gray-200 dark:to-gray-400`}
          >
            &apos;S Portfolio
          </span>
        </Link>
        <NavToggle isNavShow={isNavShow} setIsNavShow={setIsNavShow} />
        <ul className={`hidden md:flex md:ml-auto gap-4 h-full items-center`}>
          {navList.map(({ text, url }) => (
            <NavListItem key={text} text={text} url={url} />
          ))}
          <button
            className={`flex items-center justify-center p-1.5 rounded-md text-purple-light bg-purple-dark dark:bg-purple-regular dark:text-gray-dark group`}
            onClick={toggleTheme}
          >
            {!mounted ? (
              <CgDarkMode className="animate-spin" size={20} />
            ) : (
              themeIcon[theme as 'dark' | 'light']
            )}
          </button>
        </ul>
      </div>
      <ul
        className={`md:hidden absolute -bottom-11 flex -z-40 h-12 items-center bg-purple-light dark:bg-gray-dark justify-evenly left-0 w-full ${
          isNavShow
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 '
        }`}
      >
        {navList.map(({ text, url }) => (
          <NavListItem key={text} text={text} url={url} />
        ))}
        <button
          className={`flex items-center justify-center p-1.5 rounded-md text-purple-light bg-purple-dark dark:bg-purple-regular dark:text-gray-dark group`}
          onClick={toggleTheme}
        >
          {!mounted ? (
            <CgDarkMode className="animate-spin" size={20} />
          ) : (
            themeIcon[theme as 'dark' | 'light']
          )}
        </button>
      </ul>
    </nav>
  )
}
