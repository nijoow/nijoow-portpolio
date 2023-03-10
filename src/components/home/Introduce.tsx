import React from 'react';
import { GiBasketballBall, GiMusicalNotes } from 'react-icons/gi';

const Introduce = () => {
  return (
    <ul className={'list-none pl-4  sm:list-disc sm:pl-8 pr-4 leading-relaxed text-sm flex flex-col gap-4 sm:gap-2 break-keep'}>
      <li>
        <span className="font-bold text-purple-dark dark:text-purple-regular">UX/UI의 가치를 중요하게 생각합니다.</span> 개발할 때 사용자의 입장에서 디테일한
        부분까지 생각하고 계속해서 개선해나가려고 합니다. 그리고 사용자가 매력을 느낄 수 있는 아름다운 웹페이지를 구현하는 것을 가장 좋아합니다.{' '}
      </li>
      <li>
        <span className="font-bold text-purple-dark dark:text-purple-regular">더 나은 개발자가 되기 위해 꾸준히 노력하고 있습니다. </span> 독학으로 프론트엔드
        개발을 공부해왔고, 사이드 프로젝트나 알고리즘 공부, 다양한 강의를 통해 새로운 기술을 학습하고 발전하고자 합니다.{' '}
      </li>
      <li>
        <span className="font-bold text-purple-dark dark:text-purple-regular">팀원들과 원활하게 커뮤니케이션할 수 있는 개발자가 되고자 합니다.</span>{' '}
        디자인학과에서의 전공 경험과 앞으로의 프로젝트 경험, 꾸준한 학습을 바탕으로 다른 개발자뿐만 아니라 다른 직무의 팀원들과도 소통을 잘 하는 개발자가 되기
        위해 노력하고 있습니다.
      </li>
      <li>
        <div className={'flex'}>
          힙합
          <GiMusicalNotes />과 농구
          <GiBasketballBall />를 좋아합니다.
        </div>
      </li>
    </ul>
  );
};

export default Introduce;
