'use client';

import Logo from '@/components/Logo/Logo';
import NavToggle from '@/components/Navbar/NavToggle';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CgDarkMode } from 'react-icons/cg';
import { MdDarkMode, MdWbSunny } from 'react-icons/md';
import NavListItem from './NavListItem';

const themeIcon = {
  dark: (
    <MdWbSunny
      size={20}
      className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-30"
    />
  ),
  light: (
    <MdDarkMode
      size={20}
      className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-30"
    />
  ),
};

const navList = [
  { text: 'Home', url: '/' },
  { text: 'Works', url: '/works' },
  { text: 'Contact', url: '/contact' },
];

export default function NavBar() {
  const { setTheme, resolvedTheme: theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isNavShow, setIsNavShow] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`bg-purple-light dark:bg-gray-dark fixed z-50 h-12 w-full shadow-lg transition-all duration-300 dark:shadow-white/10`}
    >
      <div className={`mx-auto flex h-12 w-full max-w-2xl items-center px-3`}>
        <Link href="/" className="group flex items-center gap-2 font-semibold">
          <Logo
            width={80}
            height={50}
            className="transition-transform duration-300 group-hover:scale-[1.2] group-hover:rotate-[5deg]"
          />
          <span
            className={`from-purple-medium to-purple-darker bg-linear-to-br bg-clip-text text-transparent dark:from-gray-200 dark:to-gray-400`}
          >
            &apos;S Portfolio
          </span>
        </Link>
        <NavToggle isNavShow={isNavShow} setIsNavShow={setIsNavShow} />
        <ul className={`hidden h-full items-center gap-4 md:ml-auto md:flex`}>
          {navList.map(({ text, url }) => (
            <NavListItem key={text} text={text} url={url} />
          ))}
          <button
            className={`group bg-purple-dark text-purple-light dark:bg-purple-regular dark:text-gray-dark flex items-center justify-center rounded-md p-1.5`}
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
        className={`bg-purple-light dark:bg-gray-dark absolute -bottom-11 left-0 -z-40 flex h-12 w-full items-center justify-evenly md:hidden ${
          isNavShow ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {navList.map(({ text, url }) => (
          <NavListItem key={text} text={text} url={url} />
        ))}
        <button
          className={`group bg-purple-dark text-purple-light dark:bg-purple-regular dark:text-gray-dark flex items-center justify-center rounded-md p-1.5`}
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
  );
}
