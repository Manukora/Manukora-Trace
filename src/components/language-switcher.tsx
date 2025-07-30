'use client';

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    document.documentElement.lang = langCode;
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-60" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-32 px-4 py-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors font-moretmnk"
      >
        <span>{languages.find(lang => lang.code === i18n.language)?.label}</span>
        <span className="ml-2"><ChevronDownIcon className="w-4 h-4" /></span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white rounded-md shadow-lg overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full py-2 px-4 text-left hover:bg-gray-100 transition-colors font-moretmnk"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}