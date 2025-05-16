import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import WorkImage from '../../_container/WorkImage';

const MemoryPage = () => {
  return (
    <>
      <WorkImage
        url="https://nijoow.github.io/PNUDT12/pages/about.html"
        imgSrc="pnudt12.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎓 MEMORY</span>
      <CustomList>
        <CustomList.MainListItem>
          부산대학교 디자인학과 디자인엔테크놀로지 전공 12회 졸업전시회 웹사이트
          <CustomList.MainListItem>
            졸업전시회 소개 및 전시 정보 소개
          </CustomList.MainListItem>
          <CustomList.MainListItem>
            컨셉 및 작품 설명 (전시회 도록 대체)
          </CustomList.MainListItem>
          <CustomList.MainListItem>
            전시회 작품 시연 영상 링크
          </CustomList.MainListItem>
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <CustomList>
        <CustomList.MainListItem>HTML, CSS, Javascript</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'팀구성'} />

      <CustomList>
        <CustomList.MainListItem>
          디자인앤테크놀로지 졸업전시회 멤버 웹팀 5명
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'역할'} />

      <CustomList>
        <CustomList.MainListItem>기획 및 디자인 참여</CustomList.MainListItem>
        <CustomList.MainListItem>
          전체적인 레이아웃, About 페이지, Header 반응형 퍼블리싱
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          가로스크롤 페이지, 스크롤 타임라인 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          스크롤, hover 애니메이션 구현
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://nijoow.github.io/PNUDT12/pages/about.html"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/PNUDT12"
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

export default MemoryPage;
