import SubTitle from '@/components/_common/SubTitle'
import Section from '@/components/Section/Section'
import Information from '@/components/home/Information'
import Introduce from '@/components/home/Introduce'
import RecentlyPlayedMusic from '@/components/home/RecentlyPlayedMusic'
import React from 'react'
import {
  BsPersonCircle,
  BsFillCalendarEventFill,
  BsGithub,
  BsFillEnvelopeFill,
  BsFillPencilFill,
  BsLink45Deg,
} from 'react-icons/bs'

const informationList = [
  { icon: <BsPersonCircle />, list: '이름', contents: '이우진', link: null },
  {
    icon: <BsFillCalendarEventFill />,
    list: '생년월일',
    contents: '1996.11.27',
    link: null,
  },
  {
    icon: <BsFillPencilFill />,
    list: '학력',
    contents: '부산대학교 디자인학과 디자인앤테크놀로지전공',
    link: null,
  },
  {
    icon: <BsFillEnvelopeFill />,
    list: '이메일',
    contents: 'nijoow1127@gmail.com',
    link: null,
  },
  {
    icon: <BsGithub />,
    list: '깃허브',
    contents: '@nijoow',
    link: 'https://github.com/nijoow',
  },
  {
    icon: <BsLink45Deg />,
    list: '프로필링크',
    contents: '@nijoow',
    link: 'https://prfl.link/@nijoow',
  },
]

const Home = () => {
  return (
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
        <div className="flex flex-col w-full gap-1">
          {informationList.map(({ icon, list, contents, link }) => (
            <Information
              key={list}
              icon={icon}
              list={list}
              contents={contents}
              link={link}
            />
          ))}
        </div>
      </Section>
      <Section>
        <SubTitle title="Recently Played Music" />
        <RecentlyPlayedMusic />
      </Section>
    </div>
  )
}

export default Home
