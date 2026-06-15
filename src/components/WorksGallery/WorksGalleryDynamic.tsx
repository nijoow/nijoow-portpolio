'use client';

import dynamic from 'next/dynamic';

const WorksGallery = dynamic(() => import('./WorksGallery'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />,
});

export default WorksGallery;
