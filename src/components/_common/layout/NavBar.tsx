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

export default function NavBar() {
  const router = useRouter();
  const [isNavShow, setIsNavShow] = useState(false);
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <nav className={`${styles.nav} ${currentTheme}`}>
      <div className={styles.navBar}>
        <Link href="/">
          <div className={styles.logo}>
            <div className={styles.logoImg}>
              <Logo width={80} height={50} fill={currentTheme === 'dark' ? '#fff' : '#443483'} stroke={currentTheme === 'dark' ? '#fff' : '#443483'} />
            </div>
            <span className={`${styles.angledGradient}`}>&apos;S Portfolio</span>
          </div>
        </Link>
        <NavToggle isNavShow={isNavShow} setIsNavShow={setIsNavShow} />
        <ul className={isNavShow ? styles.show : ''}>
          <li className={`${styles.navLi} `}>
            <Link href="/">
              <span
                className={`${router.pathname === '/' ? styles.active : ''} 
                  ${styles.angledGradient} ${styles.underLine}`}
              >
                Home
              </span>
            </Link>
          </li>
          <li className={`${styles.navLi}`}>
            <Link href="/skills">
              <span
                className={`
                  ${router.pathname === '/skills' ? styles.active : ''}
                  ${styles.angledGradient} ${styles.underLine}`}
              >
                Skills
              </span>
            </Link>
          </li>
          <li className={`${styles.navLi}`}>
            <Link href="/blog">
              <span
                className={`
                  ${router.pathname.includes('/blog') ? styles.active : ''}
                  ${styles.angledGradient} ${styles.underLine}`}
              >
                blog
              </span>
            </Link>
          </li>
          <li>
            <Link href="/works">
              <span
                className={`
                  ${router.pathname.includes('/works') ? styles.active : ''}
                  ${styles.angledGradient} ${styles.underLine}`}
              >
                Works
              </span>
            </Link>
          </li>
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
