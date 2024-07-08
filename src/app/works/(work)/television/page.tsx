import React from 'react'
import PartTitle from '../../_container/PartTitle'
import Work from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const TelevisionPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-television.vercel.app/"
        imgSrc="nijoow-television.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">📺 Retro Television</span>
      <span className="text-base font-medium">
        - 3D 레트로 텔레비전으로 유투브를 시청하는 토이 프로젝트
      </span>
      <span className="text-base font-medium">- 🚧 개발 진행 중 🚧</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind CSS, React-Three-Fiber</span>
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- 회원가입, 로그인, 소셜로그인 기능</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-television.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/television"
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

export default TelevisionPage
