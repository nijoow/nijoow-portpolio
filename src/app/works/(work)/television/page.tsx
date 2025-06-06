import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import WorkImage from '../../_container/WorkImage';

const TelevisionPage = () => {
  return (
    <>
      <WorkImage
        url="https://nijoow-television.vercel.app/"
        imgSrc="television.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">📺 Television</span>

      <CustomList>
        <CustomList.MainListItem>
          3D 레트로 텔레비전으로 유투브를 시청하는 토이 프로젝트
        </CustomList.MainListItem>
        <CustomList.MainListItem> 🚧 개발 임시 중단 🚧</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Tailwind CSS, React-Three-Fiber
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기능'} />
      <CustomList>
        <CustomList.MainListItem> 3D 텔레비전 렌더링</CustomList.MainListItem>
        <CustomList.MainListItem> Youtube Player 매핑</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'개발할 기능'} />
      <CustomList>
        <CustomList.MainListItem>
          Youtube 검색, 재생 목록 추가 기능
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          사운드 조절/채널 변경 기능
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <ul className="flex flex-col gap-1 pl-2">
        <li>
          1) 화면 mesh에 react-three/drei의 HTML을 렌더링하여 Youtube Player를
          표시하였는데 width, height의 px이 너무 작아서 Youtube Player의
          요소들이 깨지는 현상 발생
        </li>
        <li>
          - 모델링된 텔레비전의 크기를 키워서 렌더링해도 Html px 크기는 변하지
          않음
        </li>
        <li>
          - width를 늘리고 css의{' '}
          <span className="mx-1 rounded-md bg-gray-500 px-2 py-1 text-sm text-white">
            transform: scale()
          </span>
          옵션으로 크기를 줄였으나 canvas에 줄어들기 전의 여백 공간이 남아있는
          문제 발생
        </li>
        <li className="font-semibold text-purple-regular">
          - css가 아닌 Html의 Object3DNode의 scale을 조절하여 해결
        </li>
      </ul>

      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-television.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/television"
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

export default TelevisionPage;
