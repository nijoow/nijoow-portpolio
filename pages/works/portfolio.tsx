import Seo from "../../components/_common/Seo";
import Link from "next/link";
import styles from "../../styles/works/Works.module.css";
import Work from "../../components/works/Work";
import { BsGithub } from "react-icons/bs";
export default function PortfolioPage() {
  return (
    <>
      <Seo customMeta={{ title: "Portfolio" }} />
      <section>
        <div className="title">
          <Link href="/works">
            <a>Works</a>
          </Link>
          <span className="secondTitle">
            &nbsp;&nbsp;&gt;&nbsp;&nbsp;포트폴리오 사이트
          </span>
        </div>
        <div className={styles.workInfomation}>
          <div className={styles.subTitle}>[View]</div>
          <Work url="https://nijoow.github.io/" imgSrc="portfolio.PNG"></Work>

          <br />
          <div className={styles.subTitle}>[Explanation]</div>
          <ul className={styles.infoContents}>
            <li>
              <span className="bold"> 개인 포트폴리오 사이트</span>
              <br />- 저에 대한 소개와 경험했던 프로젝트를 모아놓은 포트폴리오
              사이트입니다.
              <br />- 다양한 기능을 추가해보며 업데이트하고 있습니다.
            </li>
            <li>
              <span className="bold">[기술 스택]</span>
              <br />- Next.js, Typescript, SCSS
            </li>
            <li>
              <span className="bold">[주요 기능]</span>
              <br />
              - Next.js 프레임워크를 사용한 SPA 개발
              <br />
              - CSS Transition을 통한 interactive 한 웹 페이지
              <br />
              - 반응형 웹 CSS 마크업
              <br />
              - 시스템 테마에 따른 다크모드 및 토글 기능
              <br />
              - canvas와 three.js를 사용한 3D 오브젝트 렌더링
              <br />- spotify open API를 연동하여 최근에 들은 음악 소개
              <br />- markdown 파일을 통한 블로그 포스팅 기능
            </li>

            <li></li>
          </ul>
          <a
            href="https://github.com/nijoow/nijoow.github.io"
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
