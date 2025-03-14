import React from 'react'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'

const PrflLinkPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <WorkImage imgSrc="prflLink.png" />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🔗 프로필링크 (prfl.link)</span>
      <span>- 다양한 링크 한 페이지에서 볼 수 있는 멀티링크 연결 서비스</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 서비스 내 테마 페이지 디자인</li>
        <li>- svg를 활용한 테마 페이지 퍼블리싱</li>
        <li>- 로고 제작</li>
      </ul>{' '}
      <div className="my-3" />
    </>
  )
}

export default PrflLinkPage
