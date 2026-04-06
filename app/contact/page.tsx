import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact theuaecareer.com for support, job portal feedback, partnerships, and content queries.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact Us',
    description:
      'Contact theuaecareer.com for support, job portal feedback, partnerships, and content queries.',
    url: '/contact/',
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
