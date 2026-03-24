import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import SubTitle from '@/components/SubTitle/SubTitle';
import GithubCommitLog from './_container/GithubCommitLog/GithubCommitLog';
import Informations from './_container/Information/Informations';
import GreetingCard from './_container/Introduce/GreetingCard';
import Introduce from './_container/Introduce/Introduce';
import RecentlyPlayedMusic from './_container/RecentlyPlayedMusic/RecentlyPlayedMusic';

const HomePage = () => {
  return (
    <TransitionPageWrapper>
      <div className="flex flex-col gap-6">
        <Section alignItems="items-start">
          <GreetingCard />{' '}
        </Section>
        <Section>
          <Introduce />
        </Section>
        <Section>
          <SubTitle title="Information" />
          <Informations />
        </Section>
        <Section>
          <SubTitle title="Recently Played Music" />
          <RecentlyPlayedMusic />
        </Section>
        <Section>
          <SubTitle title="Github Commit Log" />
          <GithubCommitLog />
        </Section>
      </div>
    </TransitionPageWrapper>
  );
};

export default HomePage;
