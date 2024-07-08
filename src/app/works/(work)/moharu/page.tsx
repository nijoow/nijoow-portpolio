import React from 'react'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const MoharuPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <WorkImage url="https://moharu.site" imgSrc="moharu.png" />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎫 moharu</span>
      <span className="text-base font-medium">- 취미 활동 추천 플랫폼</span>
      <span className="text-base font-medium">
        - 비사이드 포텐데이 온라인 해커톤 팀 프로젝트
      </span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind CSS</span>
      <PartSubTitle title={'팀구성'} />
      <span>- 기획자 1, 디자이너 1, 프론트엔드 2, 백엔드 2</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- Next.js 구조 설계</li>
        <li>- 회원가입/이메일 로그인/소셜 로그인 기능 및 페이지 구현</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://bside.best/projects/detail/P240514222247"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>상세 설명 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://moharu.site"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/poten-moharu/moharu-frontend"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  )
}

export default MoharuPage
