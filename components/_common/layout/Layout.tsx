import NavBar from "./NavBar";
import Footer from "./Footer";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Lights from "../Lights";
import Nijoow from "../Nijoow";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "../../../store/config";
import { setTheme } from "../../../store/slices/themeSlice";

import {
  AnimatePresence,
  motion,
} from "../../../node_modules/framer-motion/dist/framer-motion";
import { useRouter } from "next/router";
interface LayoutProps {
  children: JSX.Element;
}
export default function Layout({ children }: LayoutProps) {
  const { currentTheme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const systemPrefers = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  useEffect(() => {
    const osTheme = systemPrefers ? "dark" : "light";
    const userTheme = localStorage.getItem("color-theme");
    const theme = userTheme || osTheme;
    dispatch(setTheme(theme));
    console.log(systemPrefers, osTheme, userTheme, currentTheme);
  }, [systemPrefers]);

  // const { currentTheme } = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="dark">
      <NavBar />
      <div className={`container  ${currentTheme}`}>
        <div>
          <Canvas camera={{ position: [0, 0, 1], fov: 70 }} className="canvas">
            <OrbitControls maxDistance={2} minDistance={0.9} />
            <Lights />
            <Suspense fallback={null}>
              <Nijoow />
            </Suspense>
          </Canvas>
        </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="contents"
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: "linear" }}
            key={router.route}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
};
