import Link from 'next/link';
import styles from '@styles/works/Works.module.css';
import Work from '@components/works/Work';
import { BsGithub } from 'react-icons/bs';
import Head from 'next/head';
export default function CatchTheCandyPage() {
  return (
    <>
      <Head>
        <title>Catch The Candy</title>
      </Head>
      <section>
        <div className="title">
          <Link href="/works">
            <a>Works</a>
          </Link>
          <span className="secondTitle">&nbsp;&nbsp;&gt;&nbsp;&nbsp;Catch The Candy</span>
        </div>

        <div className={styles.workInfomation}>
          <div className={styles.subTitle}>[View] </div>

          <Work url="https://nijoow.github.io/CatchTheCandy_p5/" imgSrc="catchTheCandy.PNG" />
          <br />
          <div className={styles.subTitle}>[Explanation]</div>
          <ul className={styles.infoContents}>
            <li className="bold">🍬Catch the candy (졸업전시회 팀 인터랙티브아트 p5.js ver.)</li>
            <li>
              <span className="bold">[컨셉] Bias </span>
              <br />- 바구니를 선택하면 게임은 시작된다. 높은 점수를 얻기 위해 이리저리 움직이며 떨어지는 사탕들을 받아보자. 게임에 온전히 몰입하고 빠져들어보는
              것이다. 다양한 사탕을 제대로 받고 있는 것이 맞을까? 예상과는 다른 결과가 나올지도 모른다.
            </li>
            <li>
              <span className="bold">[실행 과정] </span>
              <br />
              &nbsp;1) 빨간색 바구니와 파란색 바구니중 하나를 클릭하면 게임 시작
              <br /> &nbsp;2) 마우스 위치에 따라 바구니가 양옆으로 움직이며 하늘에서 떨어지는 사탕을 받으며 게임 진행 <br />
              &nbsp;3) 타이머가 끝나고 게임이 종료되면 결과를 확인 <br />
            </li>
            <li>
              <span className="bold">[기술 스택]</span> <br />- Javascript (p5.js)
            </li>
            <li>
              <span className="bold">[팀구성]</span>
              <br />
              졸업전시회 멤버 4명 (Memory팀)
            </li>
            <li>
              <span className="bold">[역할] </span>
              <br />
              - 아이디어 및 컨셉 기획
              <br />- 게임 기능 개발
            </li>
            <li>
              <span className="bold">[시연 영상] </span>
              <br />
              (졸업전시회 Processing &amp; Arduino ver.)
              <br />
              <a href="https://www.youtube.com/watch?v=vcJvQrc6k_w" target="_blank" rel="noopener noreferrer">
                <button className="btn">Link &gt;</button>
              </a>
            </li>
          </ul>
          <a href="https://github.com/nijoow/CatchTheCandy_p5" target="_blank" rel="noopener noreferrer">
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
