import NavBar from '@components/_common/navbar/NavBar';
import Footer from '@components/_common/footer/Footer';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { IChildren } from '@type/interface';
import Three from '@components/_common/three/Three';

const Layout = ({ children }: IChildren) => {
  const router = useRouter();
  return (
    <div className="overflow-x-hidden flex flex-col w-full min-h-screen text-black transition-all duration-300 bg-purple-50 dark:bg-gray-darker dark:text-purple-50">
      <NavBar />
      <div className="flex-auto w-full max-w-2xl px-3 pt-12 mx-auto">
        <Three />
        <AnimatePresence initial={false}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4 }}
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

export default Layout;
