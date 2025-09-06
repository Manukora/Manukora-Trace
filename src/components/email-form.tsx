'use client';

import { saveUserEmail } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { BuilderComponent } from './builder-provider';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCountryFromIP } from '@/utils/geo-consent';

// Function to detect OS -> restricted to 4 allowed labels
const getOperatingSystem = () => {
  if (typeof window === 'undefined') return '';
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('windows')) return 'Microsoft Windows 10';
  if (userAgent.includes('android')) return 'Android Linux';
  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod') || userAgent.includes('ios')) return 'Apple iOS';
  return 'GNU/Linux OS';
};

// Function to detect device type -> only "desktop" or "mobile"
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)) {
    return 'mobile';
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
  const [userLocation, setUserLocation] = useState('Unknown');
  useEffect(() => {
    // Device and OS detection is now done at submission time

    // Get user location
    const fetchLocation = async () => {
      try {
        const country = await getCountryFromIP();
        if (country) {
          setUserLocation(country);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
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
    // Get fresh values at the time of submission
    const currentDevice = getDeviceType();
    const currentOS = getOperatingSystem();
    try {
      // Use current location or fallback to 'Unknown'
      const currentLocation = userLocation || 'Unknown';
      await saveUserEmail(email, phone_number, comms, uuid, currentLocation, currentDevice, currentOS);
      
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