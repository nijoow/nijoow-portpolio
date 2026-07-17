'use client';

import Magnetic from '@/components/Motion/Magnetic';
import NavToggle from '@/components/Navbar/NavToggle';
import { AnimatePresence, m } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Logo from '../Logo/Logo';
import NavListItem from './NavListItem';

const navList = [
  { text: 'About', url: '/' },
  { text: 'Works', url: '/works' },
  { text: 'Contact', url: '/contact' },
];

export default function NavBar() {
  const [isNavShow, setIsNavShow] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isNavShow) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsNavShow(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavShow]);

  return (
    <nav aria-label="주요 메뉴" className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/50 px-5 shadow-lg backdrop-blur-xl">
        <Magnetic strength={0.2}>
          <Link
            href="/"
            className="focus-visible:ring-purple-light group flex min-h-11 items-center rounded-lg outline-none focus-visible:ring-2"
            aria-label="nijoow 홈"
          >
            <Logo
              width={56}
              height={32}
              className="transition-opacity group-hover:opacity-80"
            />
          </Link>
        </Magnetic>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {navList.map(({ text, url }) => (
            <li className="list-none" key={text}>
              <Magnetic strength={0.3}>
                <NavListItem text={text} url={url} />
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <NavToggle
          ref={toggleRef}
          isNavShow={isNavShow}
          onToggle={() => setIsNavShow((isOpen) => !isOpen)}
        />
      </div>

      <AnimatePresence>
        {isNavShow && (
          <m.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-18 left-0 w-full overflow-hidden px-4 md:hidden"
          >
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl">
              {navList.map(({ text, url }, i) => (
                <m.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  key={text}
                >
                  <Link
                    href={url}
                    onClick={() => setIsNavShow(false)}
                    className="focus-visible:ring-purple-light flex h-12 w-full items-center rounded-xl px-4 text-lg font-medium text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2"
                  >
                    {text}
                  </Link>
                </m.div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
