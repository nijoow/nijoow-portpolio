import Seo from "../../components/_common/Seo";
import Link from "next/link";
import styles from "../../styles/works/Works.module.css";
import Work from "../../components/works/Work";
import { BsGithub } from "react-icons/bs";
export default function NijoowVintagePage() {
  return (
    <>
      <Seo customMeta={{ title: "Treenow" }} />
      <section>
        <div className="title">
          <Link href="/works">
            <a>Works</a>
          </Link>
          <span className="secondTitle">
            &nbsp;&nbsp;&gt;&nbsp;&nbsp;nijoow-vintage
          </span>
        </div>
        <div className={styles.workInfomation}>
          <div className={styles.subTitle}>[View]</div>
          <Work
            url="https://nijoow-vintage.vercel.app/"
            imgSrc="nijoow-vintage.png"
          />
          <br />
          <div className={styles.subTitle}>[Explanation]</div>
          <ul className={styles.infoContents}>
            <li>
              <span className="bold">nijoow-vintage</span>
              <br />
              빈티지 쇼핑몰 토이프로젝트
              <br />- 개발 진행 중
            </li>
            <li>
              <span className="bold">[기술 스택] </span>
              <br />- Next.js, Typescript, Tailwind, Recoil, supabase
            </li>
            <li>
              <span className="bold">[기능]</span>
              <br />- supabase를 통한 이메일 회원가입 및 로그인
              <br />- 상품 리스트 및 상품 디테일 페이지
              <br />- Recoil 전역 상태로 구현한 장바구니, 관심상품 기능
            </li>
          </ul>{" "}
          <a
            href="https://github.com/nijoow/nijoow-vintage"
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
