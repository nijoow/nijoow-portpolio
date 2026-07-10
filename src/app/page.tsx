import IntroGate from '@/components/Immersive/IntroGate';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import type { Metadata } from 'next';
import ClassicHome from './_home/ClassicHome';

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { url: '/', title: SITE_NAME, description: SITE_DESCRIPTION },
};

const HomePage = () => {
  return (
    <IntroGate>
      <ClassicHome />
    </IntroGate>
  );
};

export default HomePage;
