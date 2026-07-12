import Reveal from '@/components/Motion/Reveal';
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import { CapabilityGrid } from '@/features/home/components/CapabilityGrid';
import { ContactCta } from '@/features/home/components/ContactCta';
import { FeaturedWorks } from '@/features/home/components/FeaturedWorks';
import { GithubCommitLog } from '@/features/home/components/GithubCommitLog';
import { LivePersonality } from '@/features/home/components/LivePersonality';
import { PositioningStatement } from '@/features/home/components/PositioningStatement';
import { RecentlyPlayedMusic } from '@/features/home/components/RecentlyPlayedMusic';
import { FEATURED_WORK_PAGE_NAMES } from '@/features/home/data/homeContent';
import { getWorks } from '@/features/works/data/worksData';

const featuredWorks = getWorks(FEATURED_WORK_PAGE_NAMES);

export default function ClassicHome() {
  return (
    <TransitionPageWrapper>
      <div className="flex flex-col gap-20 sm:gap-24">
        <Section>
          <Reveal>
            <PositioningStatement />
          </Reveal>
        </Section>
        <Section>
          <Reveal>
            <CapabilityGrid />
          </Reveal>
        </Section>
        <Section>
          <Reveal>
            <FeaturedWorks works={featuredWorks} />
          </Reveal>
        </Section>
        <Section>
          <Reveal>
            <LivePersonality
              music={<RecentlyPlayedMusic />}
              github={<GithubCommitLog />}
            />
          </Reveal>
        </Section>
        <Section>
          <Reveal>
            <ContactCta />
          </Reveal>
        </Section>
      </div>
    </TransitionPageWrapper>
  );
}
