import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper'
import Section from '@/components/Section/Section'
import SubTitle from '@/components/SubTitle/SubTitle'
import GithubCommitLog from './_container/GithubCommitLog/GithubCommitLog'
import Informations from './_container/Information/Informations'
import Introduce from './_container/Introduce/Introduce'
import RecentlyPlayedMusic from './_container/RecentlyPlayedMusic/RecentlyPlayedMusic'

const HomePage = () => {
  return (
    <TransitionPageWrapper>
      <div className="flex flex-col gap-6">
        <Section>
          <div
            className={
              'w-full rounded-lg bg-purple-light/50 dark:bg-white/10 flex justify-center items-center p-6 text-xl font-bold'
            }
          >
            <div className={'text-base sm:text-lg break-keep'}>
              반갑습니다🖐🏻 프론트엔드 개발자{' '}
              <span
                className={
                  'text-xl sm:text-2xl text-purple-dark dark:text-purple-light '
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
  )
}

export default HomePage
