"use client";
/*
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useState } from "react";

export default function FullReview({ locale }: { locale: string }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);
  const [honeyQuality, setHoneyQuality] = useState<number | null>(null);
  const [packagingQuality, setPackagingQuality] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isFormValid = honeyQuality !== null && packagingQuality !== null;

  return (<>
  {isSubmitted ? (
    <div className="max-w-2xl mx-auto bg-[#f9f1e2] rounded-2xl py-4 md:py-8 flex flex-col md:flex-row items-center gap-4 md:gap-8 shadow-sm">
    <div className="relative flex-shrink-0">
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="80" height="50" rx="4" fill="#fff8ec" stroke="#231F20" strokeWidth="3"/>
        <polyline points="8,20 48,55 88,20" fill="none" stroke="#231F20" strokeWidth="3"/>
        <line x1="8" y1="70" x2="48" y2="40" stroke="#231F20" strokeWidth="3"/>
        <line x1="88" y1="70" x2="48" y2="40" stroke="#231F20" strokeWidth="3"/>
      </svg>
      <span className="absolute -bottom-2 -right-2 block">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD36A] shadow-md">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#FFD36A"/>
            <path d="M16 23s-6-4.35-6-8.25A3.25 3.25 0 0 1 16 13a3.25 3.25 0 0 1 6 1.75C22 18.65 16 23 16 23z" fill="#F26A5A"/>
          </svg>
        </span>
      </span>
    </div>
    <div>
      <div className="text-3xl font-bold text-[#231F20] mb-2 font-moretmnk">{t('thankyou_title')}</div>
      <div className="text-xl text-[#231F20] font-metrosans">{t('thankyou_description')}</div>
    </div>
  </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[#fff8ec] rounded-lg flex flex-col gap-6 py-4 md:py-6"
    >
      <div className="border border-gray-300 rounded-md p-3 md:p-4 bg-white">
        <label className="block font-semibold mb-2 text-gray-900">
          {t('review_question_one')}
        </label>
        <div className="grid grid-cols-5 md:flex md:items-center md:justify-between mb-1 gap-1">
          {[...Array(10)].map((_, i) => (
            <label key={i} className="cursor-pointer">
              <input
                type="radio"
                name="honeyQuality"
                value={i + 1}
                checked={honeyQuality === i + 1}
                onChange={() => setHoneyQuality(i + 1)}
                className="sr-only"
              />
              <span
                className={`flex items-center justify-center w-full md:w-8 h-8 rounded-md border text-sm font-semibold transition
                  ${honeyQuality === i + 1
                    ? 'bg-[#FFD36A] border-yellow-500 text-black'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400'}
                `}
              >
                {i + 1}
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{t('review_poor')}</span>
          <span>{t('review_excellent')}</span>
        </div>
      </div>

      <div className="border border-gray-300 rounded-md p-3 md:p-4 bg-white">
        <label className="block font-semibold mb-2 text-gray-900">
          {t('review_question_two')}
        </label>
        <div className="grid grid-cols-5 md:flex md:items-center md:justify-between mb-1 gap-1">
          {[...Array(10)].map((_, i) => (
            <label key={i} className="cursor-pointer">
              <input
                type="radio"
                name="packagingQuality"
                value={i + 1}
                checked={packagingQuality === i + 1}
                onChange={() => setPackagingQuality(i + 1)}
                className="sr-only"
              />
              <span
                className={`flex items-center justify-center w-full md:w-8 h-8 rounded-md border text-sm font-semibold transition
                  ${packagingQuality === i + 1
                    ? 'bg-[#FFD36A] border-yellow-500 text-black'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400'}
                `}
              >
                {i + 1}
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{t('review_poor')}</span>
          <span>{t('review_excellent')}</span>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full mt-2 py-3 bg-[#FFD36A] text-black font-semibold text-lg rounded-full flex items-center justify-center gap-2 shadow-md transition-colors ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffe08a]'}`}
        disabled={!isFormValid}
        aria-disabled={!isFormValid}
      >
        {t('review_submit')}
      </button>
    </form>
    )}
    </>
  );
}
*/