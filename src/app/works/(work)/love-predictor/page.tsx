import React from 'react'
import PartTitle from '../../_container/PartTitle'
import Work from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const LovePredictorPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://ai-love-predictor.vercel.app/"
        imgSrc="ai-love-predictor.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">💓 너는 솔로? 그것이 알고싶다!</span>
      <span className="text-base font-medium">
        - 질문 응답을 통해 연애 확률 예측 결과를 보여주는 테스트
      </span>
      <span className="text-base font-medium">- 스터디용 사이드 프로젝트</span>
      <span className="text-base font-medium">
        - 기획 미완성, 프론트엔드만 임시로 제작해서 배포
      </span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Jotai, Tailwind CSS</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 기획 참여</li>
        <li>- 디자인에 따른 UI구현</li>
        <li>- 질문 응답 테스트 기능 구현</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://ai-love-predictor.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/ai-love-predictor-front"
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

export default LovePredictorPage
