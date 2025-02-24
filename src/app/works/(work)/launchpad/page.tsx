import React from 'react'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const LaunchpadPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <WorkImage
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
      <PartSubTitle title={'트러블 슈팅'} />
      <ul className="pl-2 flex flex-col gap-1">
        <li>
          1)
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            onClick
          </span>
          이벤트를 통해 사운드를 재생하였을때, 연속으로 클릭할 경우 사운드가
          끊기지 않고 중복되는 문제 발생
        </li>
        <li className="font-semibold text-purple-regular">
          - 마우스를 누를때와 떼는 이벤트를 분리하여
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            onMouseDown/onMouseEnd/onMouseLeave
          </span>
          이벤트를 통해 해결
        </li>
        <li className="font-semibold text-purple-regular">
          - 모바일 태블릿 환경에서 동작하게 하기 위해
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            onTouchStart/onTouchEnd
          </span>
          이벤트를 동시에 사용
        </li>
      </ul>

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
      <Link
        href="https://github.com/nijoow/launchpad"
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
