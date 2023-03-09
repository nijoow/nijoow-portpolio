import Link from 'next/link';
import Logo from '@components/_common/Logo';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/_common/NavBar.module.css';
import { MdDarkMode, MdWbSunny } from 'react-icons/md';
import NavToggle from '@components/_common/layout/NavToggle';
import { useAppDispatch, useAppSelector } from '@store/config';
import { toggleTheme } from '@store/slices/themeSlice';
import { useTheme } from 'next-themes';

const NavListItem = ({ text, url }: { text: string; url: string }) => {
  const router = useRouter();

  return (
    <Link href={url} className="p-2.5">
      <li
        className={`text-lg font-bold bg-gradient-to-br from-purple-medium bg-clip-text text-transparent to-purple-darker dark:from-gray-400 dark:to-gray-50 ${
          router.pathname === url ? 'underline' : ''
        }`}
      >
        {text}
      </li>
    </Link>
  );
};
export default function NavBar() {
  const [isNavShow, setIsNavShow] = useState(true);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className={`h-14 w-full fixed z-50 shadow-md bg-purple-light dark:bg-gray-dark`}>
      <div className={`${styles.navBar} max-w-2xl h-14 flex w-full mx-auto items-center `}>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo width={80} height={50} />
          <span className={`bg-gradient-to-br from-purple-medium bg-clip-text text-transparent to-purple-darker dark:from-gray-400 dark:to-gray-50`}>
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
