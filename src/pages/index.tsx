import styles from '@styles/home/Home.module.css';
import Information from '@components/home/Information';
import { BsPersonCircle, BsFillCalendarEventFill, BsGithub, BsFillEnvelopeFill, BsFillPencilFill, BsLink45Deg } from 'react-icons/bs';
import NowPlaying from '../components/home/NowPlaying';
import { GiBasketballBall, GiMusicalNotes } from 'react-icons/gi';
import Section from '@components/section/section';
import Introduce from '@components/home/Introduce';
import SubTitle from '@components/_common/SubTitle';

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Section>
        <div className={'w-full rounded-lg bg-purple-light/50 dark:bg-white/10 flex justify-center items-center p-6 text-xl font-bold '}>
          <div className={'text-base sm:text-lg break-keep'}>
            반갑습니다🖐🏻 프론트엔드 개발자 <span className={'text-xl sm:text-2xl text-purple-dark dark:text-purple-regular'}>이우진</span>입니다.
          </div>
        </div>
      </Section>
      <Section>
        <Introduce />
      </Section>
      <Section>
        <SubTitle title="Information" />
        <div className="w-full flex flex-col gap-1">
          <Information Icon={BsPersonCircle} list="이름" contents=": 이우진" link={null} />
          <Information Icon={BsFillCalendarEventFill} list="생년월일" contents=": 1996.11.27" link={null} />
          <Information Icon={BsFillPencilFill} list="학력" contents=": 부산대학교 디자인학과 디자인앤테크놀로지전공" link={null} />
          <Information Icon={BsFillEnvelopeFill} list="이메일" contents=": nijoow1127@gmail.com" link={null} />
          <Information Icon={BsGithub} list="깃허브" contents=": @nijoow" link="https://github.com/nijoow" />
          <Information Icon={BsLink45Deg} list="프로필링크" contents=": @nijoow" link="https://prfl.link/@nijoow" />
        </div>
      </Section>
      <Section>
        <SubTitle title="Recently Played Music" />
        <NowPlaying />
      </Section>
    </div>
  );
}
