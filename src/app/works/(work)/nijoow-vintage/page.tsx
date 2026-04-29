import Link from 'next/link';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

const NijoowVintagePage = () => {
  return (
    <>
      <WorkImage
        url="https://nijoow-vintage.vercel.app/"
        imgSrc="nijoow-vintage.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🧥 nijoow-vintage</span>

      <CustomList>
        <CustomList.MainListItem>
          빈티지 쇼핑몰 토이프로젝트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack
        stacks={['Next.js', 'Typescript', 'Tailwind CSS', 'Recoil', 'Supabase']}
      />

      <PartSubTitle title={'기능'} />
      <CustomList>
        <CustomList.MainListItem>
          supabase를 통한 이메일 회원가입 및 로그인
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          상품 리스트 및 상품 디테일 페이지
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          전역 상태로 임시 구현한 장바구니, 관심상품 기능
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'테스트 계정'} />

      <CustomList>
        <CustomList.MainListItem>id : test@email.com</CustomList.MainListItem>
        <CustomList.MainListItem>pw : test12#$</CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://nijoow-vintage.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/vintage"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <GithubIcon size={20} />
        <span>Github</span>
      </Link>
    </>
  );
};

export default NijoowVintagePage;
