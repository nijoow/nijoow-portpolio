import { Metadata } from 'next';
import ClassicContact from './_contact/ClassicContact';

export const metadata: Metadata = {
  title: 'Contact',
  description: '프론트엔드 개발자 이우진에게 협업과 프로젝트를 문의하세요.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'Contact' },
};

const ContactPage = () => {
  return <ClassicContact />;
};

export default ContactPage;
