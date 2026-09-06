import {
  LimitedProjectCover,
  LimitedProjectNotice,
} from '@/features/works/components/LimitedProject';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'process-safety-management';

export const metadata = createWorkMetadata(PAGE_NAME);

export default function ProcessSafetyManagementPage() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <LimitedProjectCover className="aspect-video w-full rounded-2xl border border-white/10 shadow-md" />

      <div className="my-3" />
      <LimitedProjectNotice />

      <PartTitle title="프로젝트 개요" />
      <CustomList>
        <CustomList.MainListItem>
          공정 프로세스의 작업 및 문서를 관리하는 B2B 웹 시스템
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />
      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Recoil',
          'React Query',
          'NextAuth',
          'Material UI',
          'PWA',
          'FCM',
        ]}
      />

      <PartSubTitle title="담당 영역" />
      <CustomList>
        <CustomList.MainListItem>
          반응형 웹 UI 및 한·영 다국어 환경 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          대규모 문서 목록과 복합적인 도면 인터랙션 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          PWA·푸시 알림·빌드 자동화 연동
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="주요 작업 및 문제 해결" />
      <CustomList>
        <CustomList.MainListItem>
          Next.js 기반 반응형 웹 UI 개발 및 한·영 다국어 환경 구축
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          React Query 기반으로 데이터 페칭 구조 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          MUI DataGrid에 서버사이드 페이지네이션·정렬·필터링을 연동해 10만 건
          이상 규모의 문서 목록 조회·관리
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          이미지 크롭·위치 매핑·SVG 마크업·드래그 이벤트 등 복합적인 도면
          인터랙션 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          기존 모바일 WebView 사용 과정의 히스토리 관리 문제를 줄이기 위해 PWA
          적용
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          FCM 푸시 알림 연동 및 Jenkins 기반 빌드 자동화
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
}
