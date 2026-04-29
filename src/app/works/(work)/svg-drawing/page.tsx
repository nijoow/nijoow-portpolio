import Link from 'next/link';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

const SVGDrawingPage = () => {
  return (
    <>
      <WorkImage
        url="https://nijoow-drawing.vercel.app/"
        imgSrc="nijoow-drawing.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🎨 svg-drawing</span>
      <CustomList>
        <CustomList.MainListItem>
          svg 드로잉 토이 프로젝트
        </CustomList.MainListItem>
        <CustomList.MainListItem>🚧 개발 임시 중단 🚧</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack stacks={['Next.js', 'Typescript', 'Recoil', 'Tailwind CSS']} />

      <PartSubTitle title={'기능'} />

      <CustomList>
        <CustomList.MainListItem>
          마우스 드래그로 사각형, 삼각형, 원 그리기
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          면 색, 선 색, 선 굵기, 투명도 조절
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          선택된 도형이 없을 경우 새로 그리는 도형에 적용
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          선택된 도형이 있을 경우 선택된 도형에 적용
        </CustomList.SubListItem>
        <CustomList.MainListItem>도형 핸들러 구현</CustomList.MainListItem>
        <CustomList.SubListItem>
          드래그 이동, 크기 조절, 회전 이벤트, point 수정
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          Context Menu 기능 개발
        </CustomList.MainListItem>
        <CustomList.SubListItem>삭제 및 앞 뒤로 이동</CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">
            도형 Resize 시 회전에 따른 마우스 좌표 불일치 문제
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: 도형이 회전되어 있는 상태에서 크기를 조절할 때, 실제 드래그
            거리와 도형의 크기 변화가 일치하지 않는 현상 발생
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: 중심점을 기준으로 각 꼭짓점의 상대 좌표를 계산하고, 회전각을
            적용한 벡터 연산을 통해 크기 조절 로직을 보정하여 해결
          </p>
        </CustomList.SubListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://nijoow-drawing.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center rounded-lg px-5 py-2 text-base text-white"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/svg-drawing"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-base text-white"
      >
        <GithubIcon size={20} />
        <span>Github</span>
      </Link>
    </>
  );
};

export default SVGDrawingPage;
