import { Metadata } from 'next';
import ClassicContact from './_contact/ClassicContact';

export const metadata: Metadata = {
  title: 'Contact | nijoow',
  description: 'Get in touch with me!',
};

const ContactPage = () => {
  return <ClassicContact />;
};

export default ContactPage;
