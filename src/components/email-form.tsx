'use client';

import { saveUserEmail } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { BuilderComponent } from './builder-provider';

interface EmailFormProps {
  uuid: string;
}

export default function EmailForm({ uuid }: EmailFormProps) {
  const router = useRouter();

  const handleEmailSubmit = async (email: string) => {
    try {
      await saveUserEmail(email);
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_submitted', {
          'event_category': 'engagement',
          'event_label': 'email_form',
          'value': 1
        });
      }

      if (typeof window !== 'undefined' && window.hj) {
        window.hj('event', 'email_submitted');
      }

      if (typeof window !== 'undefined' && window._learnq) {
        window._learnq.push(['track', 'Email Submitted', {
          'Email': email,
          'UUID': uuid
        }]);
      }

      router.push(`/${uuid}`);
    } catch {
      return false;
    }
    return true;
  };

  return (
    <BuilderComponent
      model="figma-imports"
      entry="33a66c32ccc64bcb8ec1cf4daf73948d"
      context={{
        handleEmailSubmit: handleEmailSubmit
      }}
    />
  );
}