import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import WorkImage from '../../_container/WorkImage';

const AtopDmsPage = () => {
  return (
    <>
      <WorkImage
        url="https://from-you.incheonilbo-interactive.com/"
        imgSrc="fromyou.png"
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

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Tailwind CSS, Motion
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'담당 역할'} />

      <CustomList>
        <CustomList.MainListItem>
          인트로 및 스크롤 애니메이션 디자인/개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          지역구/연령대/관심사 선택 기능 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          선택한 정보에 따라 기사를 보여주는 기능 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          각 기사 페이지 디자인 및 스크롤 애니메이션 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AWS Amplify 프론트엔드 배포 자동화
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'성과 및 배운점'} />

      <CustomList>
        <CustomList.MainListItem>
          신문방송편집인협회 - 2025 지역신문 기획취재 제작 지원 대상으로 선정
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          motion 라이브러리를 활용하여 다양한 스크롤 애니메이션 개발 경험
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          텍스트/이미지와 간단한 요구사항만 제공된 상황에서 기획부터 반응형
          디자인, 애니메이션 구현 및 배포까지 전 과정을 단독으로 진행
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default AtopDmsPage;
