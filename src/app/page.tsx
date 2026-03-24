import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import SubTitle from '@/components/SubTitle/SubTitle';
import GithubCommitLog from './_container/GithubCommitLog/GithubCommitLog';
import Informations from './_container/Information/Informations';
import Introduce from './_container/Introduce/Introduce';
import RecentlyPlayedMusic from './_container/RecentlyPlayedMusic/RecentlyPlayedMusic';

const HomePage = () => {
  return (
    <TransitionPageWrapper>
      <div className="flex flex-col gap-6">
        <Section alignItems="items-start">
          <div
            className={
              'flex w-full items-center justify-center rounded-2xl border border-white/5 bg-purple-light/30 p-8 text-xl font-bold backdrop-blur-sm dark:bg-white/5'
            }
          >
            <div className={'text-base break-keep sm:text-lg'}>
              반갑습니다🖐🏻 프론트엔드 개발자{' '}
              <span
                className={
                  'text-purple-dark dark:text-purple-light text-xl sm:text-2xl'
                }
              >
                이우진
              </span>
              입니다.
            </div>
          </div>
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
