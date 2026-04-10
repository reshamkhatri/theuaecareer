import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact theuaecareer.com for support, listing feedback, partnership questions, suspicious-job reports, and content requests for Gulf job seekers.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact Us',
    description:
      'Contact theuaecareer.com for support, listing feedback, partnership questions, suspicious-job reports, and content requests for Gulf job seekers.',
    url: '/contact/',
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
