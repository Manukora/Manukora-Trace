'use client';

import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    // Update the HTML lang attribute
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-60 px-4 py-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors font-moretmnk"
    >
      {i18n.language === 'en' ? 'العربية' : 'English'}
    </button>
  );
}