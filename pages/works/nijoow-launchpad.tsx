import Seo from "../../components/_common/Seo";
import Link from "next/link";
import styles from "../../styles/works/Works.module.css";
import Work from "../../components/works/Work";
import { BsGithub } from "react-icons/bs";
export default function NijoowLaunchpadPage() {
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
              <br /> 전자 악기 런치패드의 형태로 피아노와 드럼을 연주할 수 있는
              토이프로젝트 웹사이트
            </li>
            <li>
              <span className="bold">[기술 스택] </span>
              <br />- Next.js, Typescript, Tailwind,
            </li>
            <li>
              <span className="bold">[기능]</span>
              <br />- 마우스/키보드/터치 이벤트로 런치패드를 클릭할 때 마다
              사운드 재생
            </li>
          </ul>{" "}
          <a
            href="https://github.com/nijoow/nijoow-launchpad"
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
