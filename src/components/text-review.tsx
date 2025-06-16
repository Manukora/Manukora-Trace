"use client";
/*
import { saveTextReview } from "@/actions/actions";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export default function TextReview({ locale, uuid}: { locale: string, uuid: string }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastInitial, setLastInitial] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    saveTextReview(firstName, lastInitial, rating, review, uuid);
  };

  const isFormValid = rating > 0 && review.trim().length > 0 && firstName.trim().length > 0 && lastInitial.trim().length === 1;

  return (
    <>
    {isSubmitted ? (
      <div className="max-w-2xl mx-auto bg-[#f9f1e2] rounded-2xl p-8 flex items-center gap-8 shadow-sm">
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
      className="max-w-md mx-auto bg-[#fff8ec] p-6 rounded-lg flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="font-metrosans flex-1 border border-gray-300 rounded-md p-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200"
          placeholder={t('textreview_first_name') || 'First Name'}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          maxLength={32}
          required
        />
        <input
          type="text"
          className="font-metrosans w-24 border border-gray-300 rounded-md p-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200"
          placeholder={t('textreview_last_initial') || 'Last Initial'}
          value={lastInitial}
          onChange={e => setLastInitial(e.target.value.slice(0, 1).toUpperCase())}
          maxLength={1}
          required
        />
      </div>
      
      <div className="flex items-center justify-start gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={(hover ?? rating) >= star ? "#FFD36A" : "#E5E7EB"}
              stroke="#FFD36A"
              strokeWidth={1.5}
              className="w-9 h-9"
            >
              <polygon
                points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
      <textarea
        className="font-metrosans w-full border border-gray-300 rounded-md p-3 text-gray-700 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-200"
        rows={3}
        placeholder={t('textreview_placeholder')}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button
        type="submit"
        className={`w-full mt-2 py-3 bg-[#FFD36A] text-black font-semibold text-lg rounded-full flex items-center justify-center gap-2 shadow-md transition-colors ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffe08a]'}`}
        disabled={!isFormValid}
        aria-disabled={!isFormValid}
      >
        {t('textreview_submit')}
      </button>
    </form>
    )}
    </>
  );
}

*/