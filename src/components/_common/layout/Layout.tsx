import NavBar from './NavBar';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { IChildren } from '@type/interface';
import Three from '../three/Three';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
};

const Layout = ({ children }: IChildren) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full min-h-screen text-black transition-all duration-300 bg-purple-50 dark:bg-gray-darker dark:text-purple-50">
      <NavBar />
      <div className="flex-auto w-full max-w-2xl px-3 pt-12 mx-auto">
        <Three />
        <AnimatePresence initial={false}>
          <motion.div variants={variants} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'linear' }} key={router.route}>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
