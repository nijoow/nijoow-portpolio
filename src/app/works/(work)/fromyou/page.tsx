import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'fromyou';

export const metadata = createWorkMetadata(PAGE_NAME);

const FromYouPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage imgSrc="fromyou.webp" />

      <div className="my-3" />
      <PartTitle title="프로젝트 개요" />
      <CustomList>
        <CustomList.MainListItem>
          독자가 선택한 지역구, 연령대, 관심사에 따라 맞춤형으로 기사를 보여주는
          인터랙티브 웹사이트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
      />

      <PartSubTitle title="주요 작업과 결과" />

      <CustomList>
        <CustomList.MainListItem>
          SVG·드래그 앤 드롭·차트·스크롤 애니메이션 등을 활용한{' '}
          <strong className="font-bold">
            UX/UI 시각화 기획・디자인 및 반응형 웹 개발
          </strong>
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AWS Amplify 기반 <strong className="font-bold">배포 자동화</strong>{' '}
          구축
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          서브도메인 DNS 설정 및 배포
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          신문방송편집인협회의 2025 지역신문 기획취재 제작 지원 대상으로 선정된
          프로젝트의 인터랙티브 결과물 제작
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          인천일보 팀 이달의 기자상 수상에 기여
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
      <PartTitle title="관련 링크" />
      <WorkLinks
        pageName={PAGE_NAME}
        links={[
          {
            href: 'https://www.incheonilbo.com/news/articleView.html?idxno=1312711',
            label: '기사 바로가기',
          },
        ]}
      />
    </>
  );
};

export default FromYouPage;
