import { Metadata } from 'next';
import ClassicContact from './_contact/ClassicContact';
import ContactExperience from './_contact/ContactExperience';
import ContactImmersive from './_contact/ContactImmersive';

export const metadata: Metadata = {
  title: 'Contact | nijoow',
  description: 'Get in touch with me!',
};

const ContactPage = () => {
  return (
    <ContactExperience
      immersive={<ContactImmersive />}
      classic={<ClassicContact />}
    />
  );
};

export default ContactPage;
