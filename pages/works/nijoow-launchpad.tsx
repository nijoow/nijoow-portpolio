import Seo from "../../components/_common/Seo";
import Link from "next/link";
import styles from "../../styles/works/Works.module.css";
import Work from "../../components/works/Work";
import { BsGithub } from "react-icons/bs";
export default function NijoowMusicPage() {
  return (
    <>
      <Seo customMeta={{ title: "Treenow" }} />
      <section>
        <div className="title">
          <Link href="/works">
            <a>Works</a>
          </Link>
          <span className="secondTitle">
            &nbsp;&nbsp;&gt;&nbsp;&nbsp;nijoow-launchpad
          </span>
        </div>
        <div className={styles.workInfomation}>
          <div className={styles.subTitle}>[View]</div>
          <Work
            url="https://nijoow-launchpad.vercel.app/"
            imgSrc="nijoow-launchpad.png"
          />
          <br />
          <div className={styles.subTitle}>[Explanation]</div>
          <ul className={styles.infoContents}>
            <li>
              <span className="bold">nijoow-launchpad</span>
              <br /> 음악 관련 토이프로젝트
              <br />- 개발 진행 중
            </li>
            <li>
              <span className="bold">[기술 스택] </span>
              <br />- Next.js, Typescript, Zustand, Tailwind,
            </li>

            <li>
              <span className="bold">[기능]</span>
            </li>
          </ul>{" "}
          <a
            href="https://github.com/nijoow/nijoow-music"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn">
              <BsGithub />
              &nbsp; Github
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
