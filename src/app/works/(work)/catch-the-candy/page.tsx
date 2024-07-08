import React from 'react'
import PartTitle from '../../_container/PartTitle'
import Work from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const CatchTheCandyPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow.github.io/CatchTheCandy_p5/"
        imgSrc="catchTheCandy.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🍬 Catch the candy</span>
      <span className="text-base font-medium">
        - 졸업전시회 팀 인터랙티브아트 (p5.js ver.)
      </span>
      <PartSubTitle title={'컨셉'} />
      <span className="font-semibold">&quot;Bias&quot;</span>
      <span className="pl-1">
        바구니를 선택하면 게임은 시작된다. 높은 점수를 얻기 위해 이리저리
        움직이며 떨어지는 사탕들을 받아보자. 게임에 온전히 몰입하고 빠져들어보는
        것이다. 다양한 사탕을 제대로 받고 있는 것이 맞을까? 예상과는 다른 결과가
        나올지도 모른다.
      </span>
      <PartSubTitle title={'실행 과정'} />
      <ul>
        <li>1) 빨간색 바구니와 파란색 바구니중 하나를 클릭하면 게임 시작</li>
        <li>
          2) 마우스 위치에 따라 바구니가 양옆으로 움직이며 하늘에서 떨어지는
          사탕을 받으며 게임 진행{' '}
        </li>
        <li>3) 타이머가 끝나고 게임이 종료되면 결과를 확인</li>
      </ul>
      <PartSubTitle title={'기술 스택 및 사용 도구'} />
      <span>- 졸업 작품 : Processing, Arduino, kinect v1 </span>
      <span>- 웹 버전 : Javascript (p5.js)</span>
      <PartSubTitle title={'팀구성'} />
      <span>- 디자인앤테크놀로지 졸업전시회 멤버 Memory팀 4명</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 아이디어 및 컨셉 기획</li>
        <li>- 게임 기능 개발</li>
        <li>- 인터랙션 연동</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://www.youtube.com/watch?v=vcJvQrc6k_w"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>졸업전시회 시연 영상</span>
      </Link>
      <Link
        href="https://nijoow-portfolio.vercel.app/CatchTheCandy_p5/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/CatchTheCandy_p5"
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

export default CatchTheCandyPage
