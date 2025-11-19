import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import WorkCarousel from '../../_container/WorkCarousel';

const MoimcityPage = () => {
  return (
    <>
      <WorkCarousel
        imgSrcList={[
          'moimcity/moimcity.png',
          'moimcity/만남.jpeg',
          'moimcity/위시리스트.jpeg',
          'moimcity/필터.jpeg',
          'moimcity/모임상세.jpeg',
          'moimcity/프로필상세.jpeg',
        ]}
        aspectRatio="square"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-gray-400">(주)모임특별시</span>
      <span className="text-xl font-bold">💖 모임특별시</span>
      <CustomList>
        <CustomList.MainListItem>
          취향 기반 소셜 모임 플랫폼
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'담당 역할'} />

      <CustomList>
        <CustomList.MainListItem>
          서비스 리뉴얼 UI/UX 설계 및 프론트엔드 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>기존 기능 버그 수정</CustomList.MainListItem>
        <CustomList.SubListItem>
          모바일·크로스 브라우저 터치 동작 오류 해결 및 UX 안정화
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          코드 정리 및 개발 환경 최적화
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          Prettier/tailwind plugin 설정
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          레거시 코드에서 사용하지않는 파일과 코드 제거 및 구조 개선
        </CustomList.SubListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default MoimcityPage;
