import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'

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

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Recoil, Tailwind CSS
        </CustomList.MainListItem>
      </CustomList>

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

      <ul className="pl-2 flex flex-col gap-1">
        <li>
          1) 도형을 Resize할 때 회전이 되어있는 경우, 드래그와 크기 조절이
          일치하지 않는 문제 발생
        </li>
        <li>- 계산이 너무 복잡해져서 보류</li>
        <li className="font-semibold text-purple-regular">
          - 중심점을 기준으로 크기를 조절하도록 구현
        </li>
      </ul>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://nijoow-drawing.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/svg-drawing"
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

export default SVGDrawingPage
