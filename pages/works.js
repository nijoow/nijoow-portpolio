import Seo from "../components/Seo";
import Link from "next/link";
import styles from "../styles/Contents.module.css";
import { useContext } from "react";
import { UserContext } from "../context/context";
// import Image from "next/image";
const works = [
  {
    id: 1,
    pageName: "pnudt12",
    name: "MEMORY",
    url: "https://nijoow.github.io/PNUDT12/",
    imgSrc: "pnudt12.png",
  },
  {
    id: 2,
    pageName: "catchTheCandy",
    name: "CATCH THE CANDY",
    url: "https://nijoow.github.io/CatchTheCandy_p5/",
    imgSrc: "catchTheCandy.PNG",
  },
  {
    id: 3,
    pageName: "prflLink",
    name: "prfl.link",
    url: "https://prfl.link/",
    imgSrc: "prflLink.PNG",
  },
  {
    id: 4,
    pageName: "portfolio",
    name: "portfolio",
    url: "https://nijoow.github.io/",
    imgSrc: "portfolio.PNG",
  },
];

//
export default function Works() {
  const { prefix } = useContext(UserContext);
  return (
    <div>
      <Seo title="Works" />
      <section>
        <div className={styles.title}>
          <Link href="/works">
            <a>Works</a>
          </Link>{" "}
        </div>
        <div className={styles.gridContainer}>
          {works.map((work) => {
            return (
              <div
                className={`${styles.card} ${styles.cardMini}`}
                key={work.id}
              >
                <img
                  src={`${prefix}/images/works/${work.imgSrc}`}
                  width="384"
                  height="216"
                  className={styles.cardImg}
                ></img>
                {/* <Image
                  src={`${prefix}/images/works/${work.imgSrc}`}
                  width="368"
                  height="198"
                  className={styles.worksImg}
                ></Image> */}
                <Link href={`works/${work.pageName}`}>
                  <a>
                    <div className={styles.cardOverlay}>
                      <span>{work.name} &gt;</span>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
