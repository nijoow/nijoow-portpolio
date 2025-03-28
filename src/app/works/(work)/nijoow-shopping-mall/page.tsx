import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'

const NijoowShoppingMallPage = () => {
  return (
    <>
      <WorkImage
        url="https://nijoow-shopping-mall.vercel.app/"
        imgSrc="nijoow-shopping-mall.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">👟 shopping-mall</span>

      <CustomList>
        <CustomList.MainListItem>
          쇼핑몰 풀스택 토이 프로젝트
        </CustomList.MainListItem>
        <CustomList.MainListItem>🚧 개발 진행 중 🚧</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Tailwind CSS, PostgreSQL
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기능'} />

      <CustomList>
        <CustomList.MainListItem>
          회원가입, 로그인, 소셜로그인(구글) 기능
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          내 정보 수정, 배송정보 저장
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          홈화면, 상품 목록 페이지, 상품 페이지, 좋아요 리스트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'추가/개선할 기능'} />

      <CustomList>
        <CustomList.MainListItem>디자인 개선</CustomList.MainListItem>
        <CustomList.MainListItem>내 정보 생년월일 추가</CustomList.MainListItem>
        <CustomList.MainListItem>
          소셜로그인(네이버/카카오)
        </CustomList.MainListItem>
        <CustomList.MainListItem>주문, 배송, 리뷰</CustomList.MainListItem>
        <CustomList.MainListItem>
          관리자 페이지(상품/주문/리뷰 관리)
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://nijoow-shopping-mall.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/shopping-mall"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  )
}

export default NijoowShoppingMallPage
