import Section from '@components/section/section';
import Work from '@components/works/Work';
import { GetStaticProps } from 'next';
import React from 'react';
import styles from '@styles/works/Works.module.css';
import { BsGithub } from 'react-icons/bs';
import WorksBreadCrumb from '@components/works/WorksBreadCrumb';
import PartTitle from '@components/works/PartTitle';
import PartSubTitle from '@components/works/PartSubTitle';
import Link from 'next/link';

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'catch-the-candy' } }, { params: { slug: 'nijoow-vintage' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: { slug: context.params?.slug },
  };
};
const WorksDetailPage = ({ slug }: any) => {
  return (
    <>
      <Section>
        <WorksBreadCrumb subTitle={slug} />
      </Section>
      <Section alignItems="items-start">
        <PartTitle title={'View'} />
        <Work url="https://nijoow-vintage.vercel.app/" imgSrc="nijoow-vintage.png" />
        <div className="my-3" />
        <PartTitle title={'Explanation'} />
        <span className="text-2xl font-bold">nijoow-vintage</span>
        <span className="text-base font-medium text-gray-dark">빈티지 쇼핑몰 토이프로젝트</span>
        <span className="text-base font-medium text-gray-dark">🚧 개발 진행 중 🚧</span>
        <div className="my-1" />
        <PartSubTitle title={'기술 스택'} />
        <span>- Next.js, Typescript, Tailwind, Recoil, supabase</span>
        <div className="my-1" />
        <PartSubTitle title={'기능'} />
        <span>- supabase를 통한 이메일 회원가입 및 로그인</span>
        <span>- 상품 리스트 및 상품 디테일 페이지</span>
        <span>- 전역 상태로 구현한 장바구니, 관심상품 기능</span>
        <div className="my-1" />
        <Link
          href="https://github.com/nijoow/nijoow-vintage"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-2 mx-auto text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
        >
          <BsGithub />
          <span>Github</span>
        </Link>
      </Section>
    </>
  );
};

export default WorksDetailPage;
