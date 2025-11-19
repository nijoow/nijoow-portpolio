'use client';

import { motion } from 'framer-motion';
import { GiBasketballBall, GiCoffeeMug, GiMusicalNotes } from 'react-icons/gi';

const Introduce = () => {
  return (
    <ul className="flex list-none flex-col gap-2 break-keep text-start text-sm leading-relaxed sm:list-disc sm:gap-3 sm:px-4 sm:pl-8">
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-bold text-purple-dark dark:text-purple-light">
          스타트업에서 개발 세팅부터 운영 배포까지 프로젝트의 전반적인
          프로세스를 경험해 보았습니다.
        </span>{' '}
        현재는{' '}
        <span className="font-bold text-purple-dark dark:text-purple-light">
          프리랜서
        </span>
        로 프로젝트에 참여하며 실무 경력을 쌓고 있으며, 변화하는 기술 환경에
        유연하게 대응하고 성장해 나가고자 합니다.
      </motion.li>
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <span className="font-bold text-purple-dark dark:text-purple-light">
          UX/UI의 가치를 중요하게 생각합니다.{' '}
        </span>
        사용자의 관점에서 디테일한 부분까지 생각하고 계속해서 개선해 나가고자
        합니다. 프로덕트에서 디자인을 중요하게 생각하고, 사용자가 매력을 느낄 수
        있는 개성있는 웹페이지를 구현하는 것을 좋아합니다.
      </motion.li>

      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="font-bold text-purple-dark dark:text-purple-light">
          팀원들과 원활하게 커뮤니케이션할 수 있는 개발자입니다.{' '}
        </span>
        디자인학과 전공 경험을 통해 디자이너와 편하게 소통할 수 있고, UI/UX를
        함께 개선해 나갈 수 있습니다. 개발 중 기획 단계에서 발견하지 못한
        문제점을 찾아내면 기획자와 함께 고민하여 문제를 해결하려고 합니다.{' '}
      </motion.li>

      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className={'flex items-center'}>
          커피
          <GiCoffeeMug className="fill-amber-900 transition-colors dark:fill-amber-900" />
          와 농구
          <GiBasketballBall className="bounce fill-amber-700 transition-colors dark:fill-amber-600" />
          , 힙합
          <GiMusicalNotes className="fill-purple-dark dark:fill-purple-light" />
          을 좋아합니다.
        </div>
      </motion.li>
    </ul>
  );
};

export default Introduce;
