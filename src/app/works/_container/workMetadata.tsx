import { PERSON_ID, SITE_NAME, SITE_URL } from '@/lib/site';
import type { Metadata } from 'next';
import { getWork, type Work } from './worksData';

const FALLBACK_DESCRIPTION =
  '프론트엔드 개발자 이우진(nijoow)의 포트폴리오 작업물입니다.';

export function createWorkMetadata(
  pageName: string,
  overrides: Metadata = {},
): Metadata {
  const work = getWork(pageName);

  if (!work) {
    return {
      title: '작업을 찾을 수 없습니다',
      robots: { index: false, follow: false },
      ...overrides,
    };
  }

  const canonicalPath = `/works/${work.pageName}`;
  const imageUrl = `/images/works/${work.imgSrc}`;
  const description = work.description ?? FALLBACK_DESCRIPTION;
  const isIndexable = work.status !== 'draft';

  const base: Metadata = {
    title: work.name,
    description,
    keywords: work.tags,
    alternates: { canonical: canonicalPath },
    robots: { index: isIndexable, follow: isIndexable },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      siteName: SITE_NAME,
      url: canonicalPath,
      title: work.name,
      description,
      images: [{ url: imageUrl, alt: `${work.name} 작업 미리보기` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: work.name,
      description,
      images: [imageUrl],
    },
  };

  return {
    ...base,
    ...overrides,
    alternates: { ...base.alternates, ...overrides.alternates },
    openGraph: { ...base.openGraph, ...overrides.openGraph },
    twitter: { ...base.twitter, ...overrides.twitter },
  };
}

function createCreativeWorkJsonLd(work: Work) {
  const workUrl = `${SITE_URL}/works/${work.pageName}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${workUrl}/#creative-work`,
    name: work.name,
    description: work.description ?? FALLBACK_DESCRIPTION,
    url: workUrl,
    image: `${SITE_URL}/images/works/${work.imgSrc}`,
    keywords: work.tags.join(', '),
    creator: { '@id': PERSON_ID },
    contributor: { '@id': PERSON_ID },
    mainEntityOfPage: workUrl,
    ...(work.role ? { creditText: work.role } : {}),
    ...(work.liveUrl || work.repoUrl
      ? { sameAs: [work.liveUrl, work.repoUrl].filter(Boolean) }
      : {}),
  };
}

export function WorkStructuredData({ pageName }: { pageName: string }) {
  const work = getWork(pageName);
  if (!work || work.status === 'draft') return null;

  const json = JSON.stringify(createCreativeWorkJsonLd(work)).replace(
    /</g,
    '\\u003c',
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
