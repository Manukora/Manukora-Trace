'use client';

import { saveUserEmail } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { BuilderComponent } from './builder-provider';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface EmailFormProps {
  uuid: string;
  locale: string;
}

export default function EmailForm({ uuid, locale }: EmailFormProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const normalizedLocale = i18n.language?.split('-')[0] || 'en';
  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);
  // Track page view when component mounts
  useEffect(() => {
    // Google Analytics page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Email Form',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }

    // Hotjar page view
    if (typeof window !== 'undefined' && window.hj) {
      window.hj('event', 'email_form_viewed');
    }

    // Klaviyo page view
    if (typeof window !== 'undefined' && window._learnq) {
      window._learnq.push(['track', 'Email Form Viewed', {
        'Page URL': window.location.href,
        'UUID': uuid
      }]);
    }
  }, [uuid]);

  const handleEmailSubmit = async (email: string | null, phone_number: string | null, comms: string) => {
    try {
      await saveUserEmail(email, phone_number, comms, uuid);
      console.log("comms", comms);
      
      // Google Analytics event tracking
      if (email) {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_submitted', {
          'event_category': 'engagement',
          'event_label': 'email_form',
          'value': 1,
          'email_length': email.length,
          'form_location': 'email_form',
          'uuid': uuid
        });
      }

      // Hotjar event tracking
      if (typeof window !== 'undefined' && window.hj) {
        window.hj('event', 'email_submitted');
      }

      // Klaviyo event tracking
      if (typeof window !== 'undefined' && window._learnq) {
        window._learnq.push(['track', 'Email Submitted', {
          'Email': email,
          'UUID': uuid,
          'Form Location': 'email_form',
          'Email Length': email.length
        }]);
      }
    }

    if (phone_number) {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'phone_number_submitted', {
          'event_category': 'engagement',
          'event_label': 'phone_number_form',
          'value': 1,
          'phone_number_length': phone_number.length, 
          'form_location': 'phone_number_form',
          'uuid': uuid
        });
      }

      if (typeof window !== 'undefined' && window.hj) {
        window.hj('event', 'phone_number_submitted');
      }

      if (typeof window !== 'undefined' && window._learnq) {
        window._learnq.push(['track', 'Phone Number Submitted', {
          'Phone Number': phone_number,
          'UUID': uuid,
          'Form Location': 'phone_number_form',
          'Phone Number Length': phone_number.length
        }]);
      }
    }

      router.push(`/${uuid}`);
    } catch (error) {
      // Track failed submissions
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_submission_failed', {
          'event_category': 'error',
          'event_label': 'email_form',
          'error_message': error instanceof Error ? error.message : 'Unknown error'
        });
      }

      if (typeof window !== 'undefined' && window.hj) {
        window.hj('event', 'email_submission_failed');
      }

      return false;
    }
    return true;
  };

  return (
    <div className={`font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
    <BuilderComponent
      model="figma-imports"
      entry="33a66c32ccc64bcb8ec1cf4daf73948d"
      locale={normalizedLocale}
        context={{
        handleEmailSubmit: handleEmailSubmit,
      }}
      data= {{
        show_email: !(normalizedLocale === 'ar'),
        show_phone_number: (normalizedLocale === 'ar'),
        translations: {
          description: t('emailform_description'),
          disclaimer: t('emailform_disclaimer'),
          submit: t('emailform_submit')
        }
      }}
    />
    </div>
  );
}