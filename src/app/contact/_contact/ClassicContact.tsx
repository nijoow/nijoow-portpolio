import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import SubTitle from '@/components/SubTitle/SubTitle';
import { ContactForm } from '../_container/ContactForm';

// 기존 Contact(클래식 모드).
export default function ClassicContact() {
  return (
    <TransitionPageWrapper>
      <div className="flex flex-col gap-6">
        <Section>
          <SubTitle title="Contact Me" />
          <ContactForm />
        </Section>
      </div>
    </TransitionPageWrapper>
  );
}
