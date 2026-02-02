import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import SubTitle from '@/components/SubTitle/SubTitle';
import { Metadata } from 'next';
import { ContactForm } from './_container/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | nijoow',
  description: 'Get in touch with me!',
};

const ContactPage = () => {
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
};

export default ContactPage;
