'use client';

import Logo from '@/components/Logo/Logo';
import Magnetic from '@/components/Motion/Magnetic';
import NavToggle from '@/components/Navbar/NavToggle';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [isNavShow, setIsNavShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`sticky top-0 z-50 h-14 w-full transition-all duration-500 ${
        isScrolled
          ? 'border-b border-white/10 bg-white/20 shadow-lg backdrop-blur-md dark:bg-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className={`mx-auto flex h-full w-full max-w-2xl items-center px-4`}>
        <Magnetic strength={0.2}>
          <Link
            href="/"
            className="group flex items-center gap-2 font-semibold"
          >
            <Logo
              width={80}
              height={50}
              className="transition-transform duration-300 group-hover:scale-[1.1] group-hover:rotate-[5deg]"
            />
            <span
              className={`from-purple-medium to-purple-darker bg-linear-to-br bg-clip-text text-lg tracking-tight text-transparent dark:from-gray-200 dark:to-gray-400`}
            >
              &apos;S Portfolio
            </span>
          </Link>
        </Magnetic>

        {/* Desktop Menu */}
        <ul className={`hidden h-full items-center gap-6 md:ml-auto md:flex`}>
          {navList.map(({ text, url }) => (
            <Magnetic key={text} strength={0.3}>
              <NavListItem text={text} url={url} />
            </Magnetic>
          ))}
          <Magnetic strength={0.3}>
            <button
              className={`group flex items-center justify-center rounded-full bg-white/10 p-2 text-gray-900 shadow-sm transition-colors hover:bg-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20`}
              onClick={toggleTheme}
            >
              {!mounted ? (
                <CgDarkMode className="animate-spin" size={20} />
              ) : (
                themeIcon[theme as 'dark' | 'light']
              )}
            </button>
          </Magnetic>
        </ul>

        {/* Mobile Toggle */}
        <div className="ml-auto md:hidden">
          <NavToggle isNavShow={isNavShow} setIsNavShow={setIsNavShow} />
        </div>
      </div>

      {/* Modern Mobile Menu Overlay */}
      <AnimatePresence>
        {isNavShow && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-14 left-0 w-full overflow-hidden px-4 md:hidden"
          >
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:bg-black/80">
              {navList.map(({ text, url }, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={text}
                >
                  <Link
                    href={url}
                    onClick={() => setIsNavShow(false)}
                    className="flex h-12 w-full items-center px-4 text-lg font-medium text-gray-900 transition-colors hover:bg-white/10 dark:text-white"
                  >
                    {text}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navList.length * 0.1 }}
                className="mt-2 border-t border-white/10 pt-4"
              >
                <button
                  className="flex h-12 w-full items-center justify-between px-4 text-lg font-medium text-gray-900 dark:text-white"
                  onClick={toggleTheme}
                >
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/10">
                    {themeIcon[theme as 'dark' | 'light']}
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
