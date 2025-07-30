'use client';

import { t } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface InfoModalProps {
  title: string;
  description: string;
}

export default function InfoModal({ title, description }: InfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const normalizedLocale = i18n.language?.split('-')[0] || 'en';

  const InfoIcon = () => (
    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.3999 10.3888H10.9999V15.1888" stroke="#403B39" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.3999 15.1887H12.5999" stroke="#403B39" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11 6.38879C11.442 6.38879 11.8 6.74679 11.8 7.18879C11.8 7.63079 11.442 7.98879 11 7.98879C10.558 7.98879 10.2 7.63079 10.2 7.18879C10.2 6.74679 10.558 6.38879 11 6.38879V6.38879Z" stroke="#403B39" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="11.1887" r="8" stroke="#403B39" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="focus:outline-none"
        aria-label="Open information modal"
      >
        <InfoIcon />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className={`bg-[#FBF7EC] rounded-2xl p-8 max-w-md w-full mx-4 relative ${
              normalizedLocale === 'ar' ? 'text-right' : 'text-left'
            }`}
            dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 focus:outline-none"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="#403B39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="#403B39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <h2 className="text-2xl font-moretmnk font-bold mb-4">{title}</h2>
            <p className="text-base font-metrosans">{description}</p>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-[#FEC34D] text-black font-moretmnk py-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
