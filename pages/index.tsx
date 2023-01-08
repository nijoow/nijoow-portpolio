import Seo from "../components/_common/Seo";
import styles from "../styles/home/Home.module.css";
import Information from "../components/home/Information";
import {
  BsPersonCircle,
  BsFillCalendarEventFill,
  BsGithub,
  BsFillEnvelopeFill,
  BsFillPencilFill,
  BsLink45Deg,
} from "react-icons/bs";
import NowPlaying from "../components/home/NowPlaying";
import { GiBasketballBall, GiMusicalNotes } from "react-icons/Gi";
import { allPosts } from "contentlayer/generated";
import RecentPosts from "../components/home/RecentPosts";
export const getStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: any) {
  return (
    <div>
      <Seo customMeta={{ title: "Home" }} />
      <section>
        <div className={styles.introbox}>
          <div className={styles.intro}>
            반갑습니다🖐🏻 프론트엔드 개발자 <span>이우진</span>입니다.
          </div>
        </div>
      </section>
      <section>
        <ul className={styles.introContents}>
          <li>
            눈으로 보이는 결과물을 직접 완성해내는 것과 문제를 해결하는 것을
            좋아해서 프론트엔드 개발자의 꿈을 키우게 되었습니다.
          </li>
          <li>
            UX/UI를 중요하게 생각하며, 사용자가 매력을 느낄 수 있는 아름다운
            웹페이지를 구현하는 것에 흥미가 있습니다.
          </li>
          <li>
            디자인학과 전공 경험과 새로운 학습을 통해 다른 프로젝트 멤버들과
            원활하게 커뮤니케이션할 수 있는 개발자가 되는 것을 목표로 하고
            있습니다.
          </li>
          <li>
            <div className={styles.interest}>
              힙합
              <GiMusicalNotes />과 농구
              <GiBasketballBall />를 좋아합니다.
            </div>
          </li>
        </ul>
      </section>
      <section>
        <div className="title">Infomation</div>
        <Information
          Icon={BsPersonCircle}
          list="이름"
          contents=": 이우진"
          link={null}
        />
        <Information
          Icon={BsFillCalendarEventFill}
          list="생년월일"
          contents=": 1996.11.27"
          link={null}
        />
        <Information
          Icon={BsFillPencilFill}
          list="학력"
          contents=": 부산대학교 디자인학과 디자인앤테크놀로지전공"
          link={null}
        />
        <Information
          Icon={BsFillEnvelopeFill}
          list="이메일"
          contents=": nijoow1127@gmail.com"
          link={null}
        />
        <Information
          Icon={BsGithub}
          list="깃허브"
          contents=": @nijoow"
          link="https://github.com/nijoow"
        />
        <Information
          Icon={BsLink45Deg}
          list="프로필링크"
          contents=": @nijoow"
          link="https://prfl.link/@nijoow"
        />
      </section>
      <section>
        <div className="title">Recent Posts</div>
        <RecentPosts posts={posts} />
      </section>
      <section>
        <div className="title">Recently Played Music</div>

        <NowPlaying />
      </section>
    </div>
  );
}
