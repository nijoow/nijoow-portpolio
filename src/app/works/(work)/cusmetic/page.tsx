import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkCarousel from '../../_container/WorkCarousel'

const CusmeticPage = () => {
  return (
    <>
      <WorkCarousel
        imgSrcList={[
          'cusmetic/landing.png',
          'cusmetic/skin-type-check.png',
          'cusmetic/skin-type-result.png',
          'cusmetic/search.png',
          'cusmetic/cosmetic-result.png',
        ]}
        aspectRatio="square"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-gray-400">주식회사 비멕스(BMEKSCo. Ltd.)</span>
      <span className="text-xl font-bold">🧴 Cusmetic</span>

      <CustomList>
        <CustomList.MainListItem>
          피부타입 진단 설문 및 화장품 매칭률 서비스
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Recoil, Tailwind CSS
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기능'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js App Router 기반 프로젝트 세팅 및 반응형 웹 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          서버/클라이언트 컴포넌트를 조합하여 유저 페이지 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          유저/화장품/성분 등을 Excel import/export를 통해 관리할 수 있는 어드민
          페이지 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Next-Auth를 통한 소셜 로그인 연동
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          화장품 검색 리스트 무한스크롤 적용
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AWS Amplify 프론트엔드 배포 자동화
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <ul className="pl-2 flex flex-col gap-1">
        <li>
          1) Next.js 서버컴포넌트에서 fetch 함수의
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            cache: &apos;no-store&apos;
          </span>
          옵션을 적용하였으나, 30초 가량 새로운 데이터를 불러오지 못하는 문제
        </li>
        <li>
          - 클라이언트 Router Cache가 서버컴포넌트의 payload를 캐싱하여 발생한
          것을 확인
        </li>
        <li className="font-semibold text-purple-regular">
          - 해당 페이지에 접근하였을때{' '}
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            router.refresh()
          </span>
          를 통해 강제로 새로고침하도록 수정하여 문제 해결
        </li>
      </ul>

      <ul className="pl-2 flex flex-col gap-1">
        <li>
          2) Next/Image 컴포넌트를 사용하여 이미지를 불러왔을 때, 이미지를
          불러오는 속도가 느린 문제 발생
        </li>
        <li>
          -{' '}
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            layout=&apos;fill&apos;
          </span>{' '}
          옵션을 사용했을 때, 기본적으로 생성되는 이미지 srcSet 이 너무 많아지는
          것을 확인
        </li>
        <li className="font-semibold text-purple-regular">
          - next.config.js 파일에서
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            images.imageSizes / images.domains
          </span>
          옵션을 수정하여 해결
        </li>
      </ul>
      <div className="my-3" />
    </>
  )
}

export default CusmeticPage
