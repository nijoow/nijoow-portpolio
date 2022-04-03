import Seo from "../../components/Seo";
import Link from "next/link";
import styles from "../../styles/Contents.module.css";
import Work from "../../components/Work";
import { BsGithub } from "react-icons/bs";
export default function Pnudt12() {
  return (
    <>
      <Seo title="Works" />
      <section>
        <div className={styles.title}>
          <Link href="/works">
            <a>Works</a>
          </Link>
          <span className={styles.workTitle}>
            &nbsp;&nbsp;&gt;&nbsp;&nbsp;MEMORY
          </span>
        </div>
        <div className={styles.workInfomation}>
          <div className={styles.subTitle}>[View]</div>
          <Work
            url="https://nijoow.github.io/PNUDT12/"
            imgSrc="pnudt12.png"
          ></Work>
          <br />
          <div className={styles.subTitle}>[Explanation]</div>
          <ul className={styles.infoContents}>
            <li className={styles.bold}>
              부산대학교 디자인학과 디자인엔테크놀로지 전공 12회 졸업전시회
              웹사이트
            </li>
            <li>
              <span className={styles.bold}>[주요 기능] </span>
              <br />- 졸업전시회 소개 및 전시회 정보
              <br />
              - 컨셉 및 작품 설명(전시회 도록 대체)
              <br />
              - 전시회 작품 시연 영상 링크
              <br />
            </li>
            <li>
              <span className={styles.bold}>[기술 스택] </span>
              <br />- HTML, CSS, Javascript
            </li>
            <li>
              <span className={styles.bold}>[팀구성]</span>
              <br />
              졸업전시회 멤버 5명 (웹팀)
            </li>
            <li>
              <span className={styles.bold}>[역할]</span> <br />- 기획 및 디자인
              참여
              <br />- About 페이지, Header, 모바일 반응형 퍼블리싱
              <br />
              - 가로스크롤 페이지, 스크롤 타임라인 구현
              <br />- 스크롤, mouse hover에 따른 모션 구현
            </li>
          </ul>
          <a
            href="https://github.com/nijoow/PNUDT12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.btn}>
              <BsGithub />
              &nbsp; Github
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
