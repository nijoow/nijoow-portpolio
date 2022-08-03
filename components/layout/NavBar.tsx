import Link from "next/link";
import Logo from "../_common/Logo";
import { useRouter } from "next/router";
import styles from "../../styles/_common/NavBar.module.css";
import { MdDarkMode, MdWbSunny } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import NavToggle from "./NavToggle";
export default function NavBar() {
  const router = useRouter();
  const { currentTheme, dispatch, isNavShow } = useContext(UserContext);

  const toggleTheme = () => {
    dispatch({ type: "toggleTheme" });
  };
  return (
    <nav className={`${styles.nav} ${currentTheme}`}>
      <div className={styles.navBar}>
        {" "}
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
        <NavToggle />
        <ul className={isNavShow ? styles.show : styles.noShow}>
          <li className={`${styles.navLi} `}>
            <Link href="/">
              <a className="font-bold">
                <span
                  className={`${router.pathname === "/" ? styles.active : ""} 
                  ${styles.angledGradient} ${styles.underLine}`}
                >
                  About
                </span>
              </a>
            </Link>
          </li>
          <li className={`${styles.navLi}`}>
            <Link href="/skills">
              <a className="font-bold">
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
            <button className={styles.darkModeBtn} onClick={toggleTheme}>
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
