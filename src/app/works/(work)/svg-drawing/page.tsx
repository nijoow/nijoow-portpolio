import React from 'react'
import PartTitle from '../../_container/PartTitle'
import Work from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const SVGDrawingPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-drawing.vercel.app/"
        imgSrc="nijoow-drawing.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎨 svg-drawing</span>
      <span className="text-base font-medium">- svg 드로잉 토이 프로젝트</span>
      <span className="text-base font-medium">- 🚧 개발 진행 중 🚧</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Recoil, Tailwind CSS</span>
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- 마우스 드래그로 사각형, 삼각형, 원 그리기</li>
        <li>
          - 면 색, 선 색, 선 굵기, 투명도 조절 (기본 세팅으로 그리기 및 도형
          선택해서 변경)
        </li>
        <li>- 도형 선택 핸들러 구현 (드래그 이동, 크기 조절, 회전 이벤트)</li>
      </ul>
      <PartSubTitle title={'트러블 슈팅'} />
      <ul className="pl-2 flex flex-col gap-1">
        <li>
          1) 도형을 Resize할 때 회전이 되어있는 경우, 드래그와 크기 조절이
          일치하지 않는 문제 발생
        </li>
        <li>- 계산이 너무 복잡해져서 보류</li>
        <li className="font-semibold text-purple-regular">
          - 중심점을 기준으로 크기를 조절하도록 구현
        </li>
      </ul>

      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-drawing.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/svg-drawing"
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

export default SVGDrawingPage
