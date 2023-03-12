import Link from 'next/link';
import Logo from '@components/_common/Logo';
import { useState } from 'react';
import { MdDarkMode, MdWbSunny } from 'react-icons/md';
import NavToggle from '@components/_common/navbar/NavToggle';
import { useTheme } from 'next-themes';
import NavListItem from './NavListItem';

export default function NavBar() {
  const [isNavShow, setIsNavShow] = useState(true);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className={`transition-all duration-300 h-12 w-full fixed z-50 shadow-lg bg-purple-light dark:bg-gray-dark`}>
      <div className={`px-3 max-w-2xl h-12 flex w-full mx-auto items-center `}>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo width={80} height={50} />
          <span className={`bg-gradient-to-br from-purple-medium bg-clip-text text-transparent to-purple-darker dark:from-gray-200 dark:to-gray-400`}>
            &apos;S Portfolio
          </span>
        </Link>
        <NavToggle isNavShow={isNavShow} setIsNavShow={setIsNavShow} />
        <ul className={`ml-auto flex gap-4 h-full items-center`}>
          <NavListItem text={'Home'} url={'/'} />
          <NavListItem text={'Skills'} url={'/skills'} />
          <NavListItem text={'Works'} url={'/works'} />
          <button
            className={`flex items-center justify-center p-1.5 rounded-md text-purple-light bg-purple-dark dark:bg-purple-regular dark:text-gray-dark`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <MdWbSunny size={20} /> : <MdDarkMode size={20} />}
          </button>
        </ul>
      </div>
    </nav>
  );
}
