import React from 'react'
import { GiBasketballBall, GiMusicalNotes } from 'react-icons/gi'

const Introduce = () => {
  return (
    <ul className="list-none sm:px-4 sm:list-disc sm:pl-8 leading-relaxed text-sm flex flex-col gap-2 sm:gap-3 break-keep text-start">
      <li>
        프론트엔드 개발자로 React와 Next.js로 개발하며 프로젝트를
        진행해왔습니다. 개발 세팅부터 배포까지 프로젝트의 전반적인 프로세스를
        경험해 보았습니다.
      </li>
      <li>
        <span className="font-bold text-purple-dark bg-purple-light/40 dark:text-purple-light px-1.5 py-0.5 rounded-sm">
          UX/UI의 가치를 중요하게 생각합니다.
        </span>{' '}
        개발할 때 사용자의 관점에서 디테일한 부분까지 생각하고 계속해서
        개선해나가고자 합니다. 프로덕트에서 디자인을 중요하게 생각하고, 사용자가
        매력을 느낄 수 있는 흥미롭고 아름다운 웹페이지를 구현하는 것을
        좋아합니다.
      </li>
      <li>
        <span className="font-bold text-purple-dark bg-purple-light/40 dark:text-purple-light px-1.5 py-0.5 rounded-sm">
          트렌드를 잘 파악하고 새로운 기술을 습득하여, 꾸준히 발전하는 개발자가
          되기 위해 노력하고 있습니다.
        </span>{' '}
        독학으로 프론트엔드 개발을 공부하였고, 계속해서 사이드 프로젝트나
        알고리즘 공부, 다양한 강의를 통해 학습 중입니다. 최근에는 인터랙티브
        웹사이트와 Three.js에 관심이 있습니다.
      </li>
      <li>
        <span className="font-bold text-purple-dark bg-purple-light/40 dark:text-purple-light px-1.5 py-0.5 rounded-sm">
          팀원들과 원활하게 커뮤니케이션할 수 있는 개발자가 되고자 합니다.
        </span>{' '}
        디자인학과에서의 전공 경험을 통해 디자이너와 편하게 소통하고 UI/UX를
        함께 고민할 수 있습니다. 개발하면서 문제점을 발견하면 기획자와 함께
        문제를 해결해나가려고 노력합니다.
      </li>
      <li>
        <div className={'flex items-center'}>
          힙합
          <GiMusicalNotes />과 농구
          <GiBasketballBall className="bounce fill-amber-700 dark:fill-amber-600 transition-colors" />
          를 좋아합니다.
        </div>
      </li>
    </ul>
  )
}

export default Introduce
