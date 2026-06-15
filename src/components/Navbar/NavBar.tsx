'use client';

import Magnetic from '@/components/Motion/Magnetic';
import NavToggle from '@/components/Navbar/NavToggle';
import { setExperienceMode, useExperienceMode } from '@/context/ExperienceMode';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import NavListItem from './NavListItem';

const navList = [
  { text: 'Home', url: '/' },
  { text: 'Works', url: '/works' },
  { text: 'Contact', url: '/contact' },
];

function ModeToggle({ className }: { className?: string }) {
  const mode = useExperienceMode();
  return (
    <div
      role="group"
      aria-label="경험 모드 전환"
      className={cn(
        'flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium',
        className,
      )}
    >
      <button
        type="button"
        aria-pressed={mode === 'immersive'}
        onClick={() => setExperienceMode('immersive')}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          mode === 'immersive'
            ? 'bg-purple-medium text-white'
            : 'text-white/55 hover:text-white',
        )}
      >
        3D
      </button>
      <button
        type="button"
        aria-pressed={mode === 'classic'}
        onClick={() => setExperienceMode('classic')}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          mode === 'classic'
            ? 'bg-purple-medium text-white'
            : 'text-white/55 hover:text-white',
        )}
      >
        Classic
      </button>
    </div>
  );
}

export default function NavBar() {
  const mode = useExperienceMode();
  const [isNavShow, setIsNavShow] = useState(false);

  // 3D(이머시브) 모드에서는 헤더를 숨기고, 모드 전환용 최소 플로팅 토글만 노출.
  if (mode === 'immersive') {
    return (
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-black/40 font-medium backdrop-blur-xl md:h-14">
      <div className="mx-auto flex h-full w-full max-w-5xl items-center px-5">
        <Magnetic strength={0.2}>
          <Link href="/" className="group flex items-center gap-2">
            <span className="from-purple-light to-purple-medium bg-linear-to-br bg-clip-text text-lg font-bold tracking-tight text-transparent transition-opacity group-hover:opacity-80">
              nijoow
            </span>
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
          <li className="list-none">
            <ModeToggle />
          </li>
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
              <div className="mt-2 flex items-center justify-between border-t border-white/10 px-4 pt-4">
                <span className="text-sm text-white/60">모드</span>
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
