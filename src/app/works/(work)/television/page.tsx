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
        imgSrc="television.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">📺 Television</span>
      <span className="text-base font-medium">
        - 3D 레트로 텔레비전으로 유투브를 시청하는 토이 프로젝트
      </span>
      <span className="text-base font-medium">- 🚧 개발 진행 중 🚧</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind CSS, React-Three-Fiber</span>
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- 3D 텔레비전 렌더링</li>
        <li>- 화면에 Youtube Player 매핑</li>
      </ul>
      <PartSubTitle title={'개발할 기능'} />
      <ul>
        <li>- Youtube 검색, 재생 목록 추가 기능</li>
        <li>- 버튼을 돌려서 사운드 조절/채널 변경 기능</li>
      </ul>
      <PartSubTitle title={'트러블 슈팅'} />
      <ul className="pl-2 flex flex-col gap-1">
        <li>
          1) 화면 mesh에 react-three/drei의 HTML을 렌더링하여 Youtube Player를
          표시하였는데 width, height의 px이 너무 작아서 Youtube Player의
          요소들이 깨지는 현상 발생
        </li>
        <li>
          - 모델링된 텔레비전의 크기를 키워서 렌더링해도 Html px 크기는 변하지
          않음
        </li>
        <li>
          - width를 늘리고 css의{' '}
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            transform: scale()
          </span>
          옵션으로 크기를 줄였으나 canvas에 줄어들기 전의 여백 공간이 남아있는
          문제 발생
        </li>
        <li className="font-semibold text-purple-regular">
          - css가 아닌 Html의 Object3DNode의 scale을 조절하여 해결
        </li>
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
