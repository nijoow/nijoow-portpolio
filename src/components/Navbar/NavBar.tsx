'use client';

import Magnetic from '@/components/Motion/Magnetic';
import NavToggle from '@/components/Navbar/NavToggle';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Logo from '../Logo/Logo';
import NavListItem from './NavListItem';

const navList = [
  { text: 'Home', url: '/' },
  { text: 'Works', url: '/works' },
  { text: 'Contact', url: '/contact' },
];

export default function NavBar() {
  const [isNavShow, setIsNavShow] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-black/40 font-medium backdrop-blur-xl md:h-14">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center px-5">
        <Magnetic strength={0.2}>
          <Link
            href="/"
            className="group flex items-center"
            aria-label="nijoow 홈"
          >
            <Logo
              width={64}
              height={36}
              className="transition-opacity group-hover:opacity-80"
            />
          </Link>
        </Magnetic>

        {/* Desktop */}
        <ul className="hidden h-full items-center gap-7 md:ml-auto md:flex">
          {navList.map(({ text, url }) => (
            <li className="list-none" key={text}>
              <Magnetic strength={0.3}>
                <NavListItem text={text} url={url} />
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <div className="ml-auto md:hidden">
          <NavToggle isNavShow={isNavShow} setIsNavShow={setIsNavShow} />
        </div>
      </div>

      <AnimatePresence>
        {isNavShow && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-18 left-0 w-full overflow-hidden px-4 md:hidden"
          >
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl">
              {navList.map(({ text, url }, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  key={text}
                >
                  <Link
                    href={url}
                    onClick={() => setIsNavShow(false)}
                    className="flex h-12 w-full items-center px-4 text-lg font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
