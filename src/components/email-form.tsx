'use client';

import { saveUserEmail } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { BuilderComponent } from './builder-provider';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Function to detect OS
const getOperatingSystem = () => {
  if (typeof window === 'undefined') return '';
  const userAgent = window.navigator.userAgent;
  
  // More comprehensive OS detection
  if (/Android/i.test(userAgent)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
  if (/Windows/i.test(userAgent)) return 'Windows';
  if (/Macintosh|Mac OS X/i.test(userAgent)) return 'MacOS';
  if (/Linux/i.test(userAgent)) return 'Linux';
  if (/Chrome OS/i.test(userAgent)) return 'ChromeOS';
  if (/BlackBerry/i.test(userAgent)) return 'BlackBerry';
  if (/Windows Phone/i.test(userAgent)) return 'Windows Phone';
  
  return 'Unknown';
};

// Function to detect device type
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = window.navigator.userAgent;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // Check for mobile devices using user agent
  if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent)) {
    return 'mobile';
  }
  
  // Check for tablets (iPad specifically)
  if (/iPad/i.test(userAgent)) {
    return 'tablet';
  }
  
  // Fallback to screen size detection
  if (screenWidth <= 768 || screenHeight <= 768) {
    return 'mobile';
  } else if (screenWidth <= 1024) {
    return 'tablet';
  }
  
  return 'desktop';
};

interface EmailFormProps {
  uuid: string;
  locale: string;
  preTickConsent: boolean;
}

export default function EmailForm({ uuid, locale, preTickConsent }: EmailFormProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const normalizedLocale = i18n.language?.split('-')[0] || 'en';
  const [deviceType, setDeviceType] = useState('');
  const [userOS, setUserOS] = useState('');
  // Remove the state and just use the prop directly
  console.log(preTickConsent);
  useEffect(() => {
    // Set device type and OS
    setDeviceType(getDeviceType());
    setUserOS(getOperatingSystem());

    // Handle window resize for device type
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      await saveUserEmail(email, phone_number, comms, uuid, 'Unknown', deviceType, userOS);
      
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

      router.push(`/verification/${uuid}`);
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
          handleEmailSubmit: handleEmailSubmit
        }}
        data={{
          show_email: !(normalizedLocale === 'ar'),
          show_phone_number: (normalizedLocale === 'ar'),
          pre_tick_consent: preTickConsent,
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