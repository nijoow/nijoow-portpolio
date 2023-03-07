import Link from 'next/link';
import styles from '@styles/works/Works.module.css';
import Work from '@components/works/Work';

export default function TreenowPage() {
  return (
    <>
      <section>
        <div className="title">
          <Link href="/works">
            <a>Works</a>
          </Link>
          <span className="secondTitle">&nbsp;&nbsp;&gt;&nbsp;&nbsp;Treenow</span>
        </div>
        <div className={styles.workInfomation}>
          <div className={styles.subTitle}>[View]</div>
          <Work url="https://treenow.co.kr" imgSrc="treenow.png" />
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
              <br />- React.js, Typescript, Recoil, Tailwind, React-native(webview)
            </li>
            <li>
              <span className="bold">[팀구성]</span>
              <br />
              PM 1, 프론트엔드 1, 백엔드 1, 디자이너 1
            </li>
            <li>
              {' '}
              <span className="bold">[역할]</span> <br />- 프로젝트 세팅 및 SPA 웹사이트 개발
              <br />- 사용자 페이지 반응형 UI구현 및 기능 개발
              <br />- 관리자 페이지 UI구현 및 기능 개발
              <br />- REST API를 통한 기능 구현
              <br />- 외부 서비스(아임포트, KG이니시스, 모두싸인, 팝빌)의 무통장입금 결제, 본인인증, 문서 작성 및 조회, 인증서 등록, 세금계산서 조회 기능 연동
              <br />- React-Native 웹뷰를 사용한 하이브리드앱 개발 및 빌드 경험
              <br />- 구글 플레이 스토어, 애플 앱스토어 배포 경험
              <br />- firebase cloud messaging 앱 푸시알림 기능 구현
              <br />- yarn berry zero-install 환경 마이그레이션을 통한 CI/CD 속도 개선
              <br />- Lazy Loading, CDN 이미지 최적화로 성능 개선
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
