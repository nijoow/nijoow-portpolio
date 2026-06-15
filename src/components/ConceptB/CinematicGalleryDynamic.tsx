'use client';

import dynamic from 'next/dynamic';

const CinematicGallery = dynamic(() => import('./CinematicGallery'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />,
});

export default CinematicGallery;
