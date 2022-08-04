import Link from "next/link";
import Logo from "../Logo";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/_common/NavBar.module.css";
import { MdDarkMode, MdWbSunny } from "react-icons/md";
import NavToggle from "./NavToggle";
import { useAppDispatch, useAppSelector } from "../../../store/config";
import { toggleTheme } from "../../../store/slices/themeSlice";

export default function NavBar() {
  const router = useRouter();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const [isNavShow, setIsNavShow] = useState(false);
  const dispatch = useAppDispatch();
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };
  return (
    <nav className={`${styles.nav} ${currentTheme}`}>
      <div className={styles.navBar}>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <div className={styles.logoImg}>
                <Logo
                  width={80}
                  height={50}
                  fill={currentTheme === "dark" ? "#fff" : "#443483"}
                  stroke={currentTheme === "dark" ? "#fff" : "#443483"}
                />
              </div>
              <span className={`${styles.angledGradient}`}>
                &apos;S Portfolio
              </span>
            </div>
          </a>
        </Link>
        <NavToggle isNavShow={isNavShow} setIsNavShow={setIsNavShow} />
        <ul className={isNavShow ? styles.show : ""}>
          <li className={`${styles.navLi} `}>
            <Link href="/">
              <a>
                <span
                  className={`${router.pathname === "/" ? styles.active : ""} 
                  ${styles.angledGradient} ${styles.underLine}`}
                >
                  Home
                </span>
              </a>
            </Link>
          </li>
          <li className={`${styles.navLi}`}>
            <Link href="/skills">
              <a>
                <span
                  className={`
                  ${router.pathname === "/skills" ? styles.active : ""}
                  ${styles.angledGradient} ${styles.underLine}`}
                >
                  Skills
                </span>
              </a>
            </Link>
          </li>
          <li className={`${styles.navLi}`}>
            <Link href="/blog">
              <a>
                <span
                  className={`
                  ${router.pathname.includes("/blog") ? styles.active : ""}
                  ${styles.angledGradient} ${styles.underLine}`}
                >
                  blog
                </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/works">
              <a>
                <span
                  className={`
                  ${router.pathname.includes("/works") ? styles.active : ""}
                  ${styles.angledGradient} ${styles.underLine}`}
                >
                  Works
                </span>
              </a>
            </Link>
          </li>
          <div className={styles.darkModeBtnContainer}>
            <button className={styles.darkModeBtn} onClick={toggleThemeHandler}>
              {currentTheme === "dark" ? (
                <MdWbSunny className={styles.darkModeIcon} />
              ) : (
                <MdDarkMode className={styles.darkModeIcon} />
              )}
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
}
