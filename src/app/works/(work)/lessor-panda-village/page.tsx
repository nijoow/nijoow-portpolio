import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

const LessorPandaVillagePage = () => {
  return (
    <>
      <WorkImage
        url="https://lessor-panda-village.vercel.app/"
        imgSrc="lessor-panda-village.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🐾 Lessor Panda Village (레서판다 빌리지)</span>
      <CustomList>
        <CustomList.MainListItem>
          레서판다와 함께 평화로운 마을을 탐험하는 3D 인터랙티브 웹 애플리케이션입니다.
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'컨셉'} />

      <span className="font-semibold">&quot;Healing Village&quot;</span>
      <span className="pl-1">
        복잡한 일상에서 벗어나 레서판다와 함께 여유롭게 마을을 거닐며 힐링하는 시간을 가집니다.
        낮과 밤의 변화, 흩날리는 벚꽃, 밤하늘의 반딧불이 등 감성적인 연출을 통해 몰입감 있는 경험을 제공합니다.
      </span>

      <PartSubTitle title={'주요 기능'} />

      <CustomList>
        <li>1) **3D 탐험**: WASD 또는 방향키를 사용하여 레서판다를 자유롭게 조작 (걷기, 달리기, 점프)</li>
        <li>2) **낮과 밤의 변화**: 실시간으로 전환되는 조명과 환경 연출 (Fireflies & Starry sky)</li>
        <li>3) **감성적인 시각 효과**: 흩날리는 하트 모양 벚꽃 잎과 블루밍 효과 등 포스트 프로세싱 적용</li>
        <li>4) **물리 상호작용**: 마을 내 울타리, 집, 나무 등 지형지물과의 충돌 처리 구현</li>
      </CustomList>

      <PartSubTitle title={'기술 스택 및 사용 도구'} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Core
          </span>
          <TechStack stacks={['Next.js 15 (App Router)', 'React 19', 'TypeScript']} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            3D & Graphics
          </span>
          <TechStack stacks={['Three.js', 'React Three Fiber', '@react-three/drei', '@react-three/postprocessing']} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Styling & Animation
          </span>
          <TechStack stacks={['Tailwind CSS 4', 'Framer Motion']} />
        </div>
      </div>

      <PartSubTitle title={'팀 구성'} />

      <CustomList>
        <CustomList.MainListItem>
          개인 프로젝트 (Woojin Lee)
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />
      <Link
        href="https://lessor-panda-village.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/lessor-panda-village"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  );
};

export default LessorPandaVillagePage;
