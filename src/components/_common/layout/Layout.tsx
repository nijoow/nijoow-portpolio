import NavBar from './NavBar';
import Footer from './Footer';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from '../Lights';
import Nijoow from '../Nijoow';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '@store/config';
import { setTheme } from '@store/slices/themeSlice';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { IChildren } from '@type/interface';

const Layout = ({ children }: IChildren) => {
  const router = useRouter();
  return (
    <div className="w-full bg-purple-100 dark:bg-gray-darker">
      <NavBar />
      <div className="w-full max-w-3xl mx-auto pt-14">
        <Canvas camera={{ position: [0, 0, 1], fov: 70 }} className="py-12">
          <OrbitControls maxDistance={2} minDistance={0.9} />
          <Lights />
          <Suspense fallback={null}>
            <Nijoow />
          </Suspense>
        </Canvas>

        <AnimatePresence initial={false}>
          <motion.div
            className="contents"
            variants={variants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'linear' }}
            key={router.route}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
};

export default Layout;
