import Link from 'next/link';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

const FromYouPage = () => {
  return (
    <>
      <WorkImage
        url="https://from-you.incheonilbo-interactive.com/"
        imgSrc="fromyou.webp"
      />

      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-gray-400">인천일보</span>
      <span className="text-xl font-bold">🌌 독자시점주의 From You</span>
      <CustomList>
        <CustomList.MainListItem>
          독자가 선택한 지역구, 연령대, 관심사에 따라 맞춤형으로 기사를 보여주는
          인터랙티브 웹사이트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack stacks={['Next.js', 'Typescript', 'Tailwind CSS', 'Motion']} />

      <PartSubTitle title={'주요 업무 및 성과'} />

      <CustomList>
        <CustomList.MainListItem>
          SVG・드래그앤드롭・차트・스크롤 애니메이션 등을 활용한{' '}
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
          신문방송편집인협회 - 2025 지역신문 기획취재 제작 지원 대상으로 선정
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          인천일보 팀 이달의 기자상 수상에 기여
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
      <Link
        href="https://from-you.incheonilbo-interactive.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center rounded-lg px-5 py-2 text-base text-white"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://www.incheonilbo.com/news/articleView.html?idxno=1312711"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center rounded-lg px-5 py-2 text-base text-white"
      >
        <span>기사 바로가기</span>
      </Link>
    </>
  );
};

export default FromYouPage;
