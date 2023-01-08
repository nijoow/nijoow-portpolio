import Seo from "../../components/_common/Seo";
import Link from "next/link";
import styles from "../../styles/works/Works.module.css";
import Work from "../../components/works/Work";
import { BsGithub } from "react-icons/bs";
export default function TreenowPage() {
  return (
    <>
      <Seo customMeta={{ title: "Treenow" }} />
      <section>
        <div className="title">
          <Link href="/works">
            <a>Works</a>
          </Link>
          <span className="secondTitle">
            &nbsp;&nbsp;&gt;&nbsp;&nbsp;Treenow
          </span>
        </div>
        <div className={styles.workInfomation}>
          <div className={styles.subTitle}>[View]</div>
          <Work url="https://treenow.co.kr" imgSrc="" />
          <br />
          <div className={styles.subTitle}>[Explanation]</div>
          <ul className={styles.infoContents}>
            <li>
              <span className="bold">트리나우</span>
              <br /> B2B 조경 수목 거래 플랫폼 웹/하이브리드앱
              <br />
            </li>
            <li>
              <span className="bold">[기술 스택] </span>
              <br />- React.js, Typescript, Recoil, Tailwind,
              React-native(webview)
            </li>
            <li>
              <span className="bold">[팀구성]</span>
              <br />
              PM 1, 프론트엔드 1, 백엔드 1, 디자이너 1
            </li>
            <li>
              <span className="bold">[역할]</span> <br />- React.js 와
              typescript 를 사용한 SPA 개발 <br />- React-Native 웹뷰를 사용한
              하이브리드앱 서비스 (android, ios 배포) <br />- tailwind css를
              활용한 UI 구현 및 반응형 웹 개발
              <br />- 백엔드 개발자와 협업하여 REST API 연동 <br />- 백오피스
              관리자 페이지 개발 <br />- 아임포트/KG이니시스 등 외부 API 연동을
              통한 결제/본인인증 시스템
              <br />- github action 을 통한 CI/CD <br />- yarn berry
              zero-install 환경 마이그레이션 <br />- firebase cloud messaging 앱
              푸시알림 연동
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
