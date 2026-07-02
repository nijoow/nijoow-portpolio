import GithubCommitLog from '@/app/_container/GithubCommitLog/GithubCommitLog';
import Informations from '@/app/_container/Information/Informations';
import GreetingCard from '@/app/_container/Introduce/GreetingCard';
import Introduce from '@/app/_container/Introduce/Introduce';
import RecentlyPlayedMusic from '@/app/_container/RecentlyPlayedMusic/RecentlyPlayedMusic';
import Reveal from '@/components/Motion/Reveal';
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import SubTitle from '@/components/SubTitle/SubTitle';

// 기존 포트폴리오 홈(클래식 모드). 새 3D 모드와 토글로 전환된다.
export default function ClassicHome() {
  return (
    <TransitionPageWrapper>
      <div className="flex flex-col gap-14">
        <Section alignItems="items-start">
          <GreetingCard />
        </Section>
        <Section>
          <Introduce />
        </Section>
        <Section>
          <Reveal>
            <SubTitle eyebrow="Profile" title="Information" />
            <Informations />
          </Reveal>
        </Section>
        <Section>
          <Reveal>
            <SubTitle eyebrow="Music" title="Recently Played" />
            <RecentlyPlayedMusic />
          </Reveal>
        </Section>
        <Section>
          <Reveal>
            <SubTitle eyebrow="GitHub" title="Commit Log" />
            <GithubCommitLog />
          </Reveal>
        </Section>
      </div>
    </TransitionPageWrapper>
  );
}
