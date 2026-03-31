'use client';

import { motion } from 'framer-motion';
import { GiBasketballBall, GiCoffeeMug, GiMusicalNotes } from 'react-icons/gi';

const Introduce = () => {
  return (
    <ul className="flex list-none flex-col gap-2 text-start text-sm leading-relaxed font-medium break-keep sm:list-disc sm:gap-3 sm:px-4 sm:pl-8">
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-purple-dark dark:text-purple-light font-extrabold">
          서비스 초기 세팅부터 배포, 운영까지 전반적인 프로세스를 경험했습니다.
        </span>{' '}
        스타트업과 프리랜서로 Next.js와 TypeScript 기반의 프로젝트를 통해 실무
        역량을 쌓았습니다. 최근에는{' '}
        <span className="text-purple-dark dark:text-purple-light font-extrabold">
          AI Agent를 활용한 개발 생산성 향상
        </span>
        에 집중하고 있으며, 변화하는 기술환경에 유연하게 대응하고 꾸준히
        성장하고자 합니다.{' '}
      </motion.li>
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <span className="text-purple-dark dark:text-purple-light font-extrabold">
          사용자의 몰입감과 UX/UI의 가치를 중요하게 생각하고 실현합니다.
        </span>
        디자인학과 전공 경험을 바탕으로 디자이너의 의도를 깊이 이해하고 디테일을
        완성하고자 합니다. 최근에는{' '}
        <span className="text-purple-dark dark:text-purple-light font-extrabold">
          웹 3D 기술을 학습{' '}
        </span>
        하여 더욱 풍부하고 개성있는 사용자 경험을 제공하는 것에 관심을 가지고
        있습니다.
      </motion.li>

      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="text-purple-dark dark:text-purple-light font-extrabold">
          팀원들과 원활하게 소통하고 협업하여 함께 목표를 달성하고자 합니다.
        </span>
        기획 단계에서 놓치기 쉬운 기술적·사용성 문제를 찾아내고,
        기획자·디자이너와 함께 최선의 해결책을 고민하여 문제를 해결하는 것에 큰
        보람을 느낍니다.
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
