'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const introduceItems = [
  {
    lead: '서비스 초기 세팅부터 배포, 운영까지 전반적인 프로세스를 경험했습니다.',
    body: (
      <>
        스타트업과 프리랜서로 Next.js와 TypeScript 기반의 프로젝트를 통해 실무
        역량을 쌓았습니다. 최근에는{' '}
        <strong className="text-purple-light font-extrabold">
          AI Agent를 활용한 개발 생산성 향상
        </strong>
        에 집중하고 있으며, 변화하는 기술환경에 유연하게 대응하고 꾸준히
        성장하고자 합니다.
      </>
    ),
  },
  {
    lead: '사용자의 몰입감과 UX/UI의 가치를 중요하게 생각하고 실현합니다.',
    body: (
      <>
        디자인학과 전공 경험을 바탕으로 디자이너의 의도를 깊이 이해하고 디테일을
        완성하고자 합니다. 최근에는{' '}
        <strong className="text-purple-light font-extrabold">
          웹 3D 기술을 학습
        </strong>
        하여 더욱 풍부하고 개성있는 사용자 경험을 제공하는 것에 관심을 가지고
        있습니다.
      </>
    ),
  },
  {
    lead: '팀원들과 원활하게 소통하고 협업하여 함께 목표를 달성하고자 합니다.',
    body: (
      <>
        기획 단계에서 놓치기 쉬운 기술적·사용성 문제를 찾아내고,
        기획자·디자이너와 함께 최선의 해결책을 고민하여 문제를 해결하는 것에 큰
        보람을 느낍니다.
      </>
    ),
  },
];

const Introduce = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {introduceItems.map((item, i) => (
        <motion.div
          key={item.lead}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 * i }}
          className="border-purple-medium/50 flex flex-col gap-1.5 border-l-2 py-1 pl-4 break-keep sm:pl-5"
        >
          <p className="text-base font-extrabold sm:text-lg">{item.lead}</p>
          <p className="text-[15px] leading-relaxed text-white/65">
            {item.body}
          </p>
        </motion.div>
      ))}

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-2 flex items-center gap-1 text-sm text-white/70"
      >
        커피
        <Image
          src="/images/icons/coffee.svg"
          alt=""
          width={20}
          height={20}
          className="inline-block"
        />
        와 농구
        <Image
          src="/images/icons/basketball.svg"
          alt=""
          width={20}
          height={20}
          className="bounce inline-block"
        />
        , 힙합
        <Image
          src="/images/icons/hiphop.svg"
          alt=""
          width={20}
          height={20}
          className="inline-block"
        />
        을 좋아합니다.
      </motion.div>
    </div>
  );
};

export default Introduce;
