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

      <span className="text-xl font-bold">
        🐾 Lessor Panda Village (레서판다 빌리지)
      </span>
      <CustomList>
        <CustomList.MainListItem>
          레서판다와 함께 평화로운 마을에서 다른 유저들과 소통하는 3D 인터랙티브
          웹 애플리케이션
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AI Agent(Antigravity)를 페어 프로그래밍 파트너로 활용하여 복잡한 3D
          로직과 실시간 동기화 기능을 효율적으로 구현
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택 및 사용 도구'} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Core
          </span>
          <TechStack
            stacks={[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Supabase Realtime',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            3D Rendering & Physics
          </span>
          <TechStack
            stacks={[
              'Three.js',
              'React Three Fiber',
              '@react-three/drei',
              '@react-three/postprocessing',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Styling & Animation
          </span>
          <TechStack stacks={['Tailwind CSS 4', 'Framer Motion']} />
        </div>
      </div>
      <PartSubTitle title={'주요 기능'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">3D 캐릭터 컨트롤 & 인터랙션</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          키보드/마우스를 통한 자유로운 이동(걷기, 달리기, 점프) 및 물리 엔진
          기반의 충돌 처리
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">실시간 멀티플레이어 시스템</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          Supabase Realtime을 활용하여 접속 중인 유저의 위치와 닉네임을
          실시간으로 동기화
        </CustomList.SubListItem>
        <CustomList.SubListItem>실시간 채팅 기능 구현</CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">낮과 밤에 따른 시각효과 변화</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          낮과 밤의 실시간 전환에 따른 조명 변화 및 흩날리는 벚꽃, 반딧불이 등의
          파티클 시스템
        </CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title={'팀 구성'} />

      <CustomList>
        <CustomList.MainListItem>개인 프로젝트</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">하이드레이션(Hydration) 에러</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
            이슈:
          </strong>{' '}
          랜덤하게 파티클을 배치할 때, 서버에서 렌더링된 결과와 클라이언트에서
          첫 렌더링된 결과가 일치하지 않아 하이드레이션 에러가 발생
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
            해결책:
          </strong>{' '}
          클라이언트 전용 상태를 useEffect 내에서 초기화, dynamic import 를 통해
          서버 사이드 렌더링 시에는 해당 로직을 제외, 로딩 화면을 통해 에셋
          로딩이 완료된 시점부터 클라이언트 전용 UI를 활성화하여 UX 개선
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">
            캐릭터 위 닉네임 위치 동기화 문제
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
            이슈:
          </strong>{' '}
          닉네임을 &lt;Html&gt; 컴포넌트로 구현했을 때, 캐릭터가 움직일 때
          닉네임 UI가 캐릭터 위에 고정되지 않는 현상 발생
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
            해결책:
          </strong>{' '}
          &lt;Text&gt; 컴포넌트를 사용하여 닉네임을 3D 씬의 일부로 포함시켜
          정확한 위치 동기화
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">
            실시간 멀티플레이어 동기화 최적화
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
            이슈:
          </strong>{' '}
          Supabase Realtime을 통한 실시간 동기화 구현 시, 과도한 네트워크 사용량
          발생 및 잦은 상태 업데이트로 인한 리렌더링 부하 문제 발생
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
            해결책:
          </strong>{' '}
          플레이어 위치 정보를 React 상태 대신 useRef로 관리하여 리렌더링을
          차단하고, 전송 주기를 100ms로 제한 및 변화 감지 로직을 통해 이벤트
          발생을 최소화하여 네트워크 트래픽을 80% 이상 절감
        </CustomList.SubListItem>
      </CustomList>
      <div className="my-3" />

      <PartTitle title={'Link'} />
      <Link
        href="https://lessor-panda-village.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center rounded-lg px-5 py-2 text-base text-white"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/lessor-panda-village"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-base text-white"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  );
};

export default LessorPandaVillagePage;
