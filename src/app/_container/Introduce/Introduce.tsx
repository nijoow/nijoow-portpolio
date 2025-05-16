'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { GiBasketballBall, GiMusicalNotes } from 'react-icons/gi';

const Introduce = () => {
  return (
    <ul className="flex list-none flex-col gap-2 break-keep text-start text-sm leading-relaxed sm:list-disc sm:gap-3 sm:px-4 sm:pl-8">
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        프론트엔드 개발자로 React와 Next.js로 개발하며 프로젝트를 진행해
        왔습니다. 스타트업에서 개발 세팅부터 운영 배포까지 프로젝트의 전반적인
        프로세스를 경험해 보았습니다.
      </motion.li>
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <span className="font-bold text-purple-dark dark:text-purple-light">
          UX/UI의 가치를 중요하게 생각합니다.
        </span>{' '}
        사용자의 관점에서 디테일한 부분까지 생각하고 계속해서 개선해 나가고자
        합니다. 프로덕트에서 디자인을 중요하게 생각하고, 사용자가 매력을 느낄 수
        있는 웹페이지를 구현하는 것을 좋아합니다.
      </motion.li>
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="font-bold text-purple-dark dark:text-purple-light">
          주도적으로 성장할 수 있는 개발자입니다.
        </span>{' '}
        독학으로 프론트엔드 개발자가 되었고, 꾸준히 사이드 프로젝트나 알고리증
        공부, 다양한 강의를 통해 학습하고 있습니다. 최근에는 Next.js App
        라우터를 공부하여 프로젝트에 도입하였고, Next.js를 통한 풀스택 개발을
        공부하고 있습니다.
      </motion.li>
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="font-bold text-purple-dark dark:text-purple-light">
          팀원들과 원활하게 커뮤니케이션할 수 있는 개발자입니다.
        </span>{' '}
        디자인학과 전공 경험을 통해 디자이너와 편하게 소통할 수 있고, UI/UX를
        함께 개선해 나갈 수 있습니다. 개발 중 기획 단계에서 발견하지 못한
        문제점을 찾아내면 기획자와 함께 고민하여 문제를 해결하려고 합니다.
      </motion.li>
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <span className="font-bold text-purple-dark dark:text-purple-light">
          인터랙티브 웹 페이지와 3D에 관심이 많습니다.
        </span>{' '}
        디자인학과에서 전공 수업으로 인터랙티브 아트와 3D 모델링을 학습하였고,
        졸업전시회를 하며 인터랙티브 미디어 아트 작품을 구현해본 경험이
        있습니다. 웹 개발을 할 때도 사용자와 상호작용하거나 눈길을 끄는 웹
        페이지를 만들 때 가장 흥미를 느낍니다.
      </motion.li>
      <motion.li
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <div className={'flex items-center'}>
          힙합
          <GiMusicalNotes />과 농구
          <GiBasketballBall className="bounce fill-amber-700 transition-colors dark:fill-amber-600" />
          를 좋아합니다.
        </div>
      </motion.li>
    </ul>
  );
};

export default Introduce;
