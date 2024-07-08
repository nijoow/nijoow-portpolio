import React from 'react'
import PartTitle from '../../_container/PartTitle'
import Work from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const LaunchpadPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-launchpad.vercel.app/"
        imgSrc="nijoow-launchpad.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎹 nijoow-launchpad</span>
      <span>- 전자 악기 런치패드 토이프로젝트</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind CSS</span>
      <PartSubTitle title={'기능'} />
      <span>
        - 마우스/키보드/터치 이벤트로 런치패드를 클릭할 때 마다 사운드 재생
      </span>
      <span>
        - 피아노 사운드/드럼을 포함한 다양한 사운드의 두가지 모드로 연주 가능
      </span>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-launchpad.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/nijoow-launchpad"
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

export default LaunchpadPage
