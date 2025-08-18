'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQData {
  faq: {
    id: string;
    question: string;
    answer: string;
    question_arabic: string;
    answer_arabic: string;
  };
  order: number;
}

// Helper function to check if a string contains HTML
const containsHTML = (str: string): boolean => {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
};

// Helper function to safely render content that might be HTML
const RenderContent = ({ content }: { content: string }) => {
  const isHTML = containsHTML(content);
  
  if (isHTML) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  
  return <p className="font-metrosans text-black">{content}</p>;
};

export default function Faq({ locale, data }: { locale: string; data: FAQData[] }) {
    const { t, i18n } = useTranslation();
    const [faqs, setFaqs] = useState<FAQData[]>([]);

    useEffect(() => {
        if (locale) {
          i18n.changeLanguage(locale);
        }
    }, [locale, i18n]);

    useEffect(() => {
        if (data) {
            setFaqs(data);
        }
    }, [data]);

    return (
      <>
      {(faqs && faqs.length > 0) && (
        <div className={`w-screen bg-[#fbf7ec] relative ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="faq-section max-w-[1200px] mx-auto px-4">
          <div className="faq-title">
            <h2 style={{ fontFamily: 'var(--font-moretmnk)', fontWeight: 400 }}>{t('faq_title')}</h2>
          </div>
          <div className="faq-list">
            {faqs.filter(item => item.faq).map((item) => (
              <div key={item.faq.id} className="faq-item">
                <div 
                  className="faq-question font-metrosans text-lg font-bold"
                  onClick={(e) => {
                    const item = e.currentTarget.parentElement;
                    if (!item) return;
                    const answer = item.querySelector('.faq-answer');
                    const arrow = item.querySelector('.faq-arrow');
                    if (!answer || !arrow) return;
                    answer.classList.toggle('active');
                    arrow.classList.toggle('active');
                  }}
                >
                  <h3 className="font-metrosans text-lg font-bold">
                    {locale === 'ar' ? item.faq.question_arabic : item.faq.question}
                  </h3>
                  <svg 
                    className="faq-arrow"
                    stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 16 16" 
                    height="1em" 
                    width="1em" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                  </svg>
                </div>
                <div className="faq-answer font-metrosans text-black">
                  <RenderContent content={locale === 'ar' ? item.faq.answer_arabic : item.faq.answer} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        )}
        {(!faqs || faqs.length === 0) && (
        <div className={`w-screen bg-[#fbf7ec] relative ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="faq-section max-w-[1200px] mx-auto px-4">
          <div className="faq-title">
            <h2 style={{ fontFamily: 'var(--font-moretmnk)', fontWeight: 400 }}>{t('faq_title')}</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <div 
                className="faq-question font-metrosans text-lg font-bold"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (!item) return;
                  const answer = item.querySelector('.faq-answer');
                  const arrow = item.querySelector('.faq-arrow');
                  if (!answer || !arrow) return;
                  answer.classList.toggle('active');
                  arrow.classList.toggle('active');
                }}
              >
                <h3 className="font-metrosans text-lg font-bold">{t('faq_question_one')}</h3>
                <svg 
                  className="faq-arrow"
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 16 16" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                </svg>
              </div>
              <div className="faq-answer">
                <p className="font-metrosans text-black ">{t('faq_answer_one')}</p>
              </div>
            </div>

            <div className="faq-item">
              <div 
                className="faq-question font-metrosans text-lg font-bold"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (!item) return;
                  const answer = item.querySelector('.faq-answer');
                  const arrow = item.querySelector('.faq-arrow');
                  if (!answer || !arrow) return;
                  answer.classList.toggle('active');
                  arrow.classList.toggle('active');
                }}
              >
                <h3 className="font-metrosans text-lg font-bold">{t('faq_question_two')}</h3>
                <svg 
                  className="faq-arrow"
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 16 16" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                </svg>
              </div>
              <div className="faq-answer">
                <p className="font-metrosans text-black ">{t('faq_answer_two')}</p>
              </div>
            </div>

            <div className="faq-item">
              <div 
                className="faq-question font-metrosans text-lg font-bold"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (!item) return;
                  const answer = item.querySelector('.faq-answer');
                  const arrow = item.querySelector('.faq-arrow');
                  if (!answer || !arrow) return;
                  answer.classList.toggle('active');
                  arrow.classList.toggle('active');
                }}
              >
                <h3 className="font-metrosans text-lg font-bold">{t('faq_question_three')}</h3>
                <svg 
                  className="faq-arrow"
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 16 16" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                </svg>
              </div>
              <div className="faq-answer">
                <p className="font-metrosans text-black ">{t('faq_answer_three')}</p>
              </div>
            </div>

            <div className="faq-item">
              <div 
                className="faq-question font-metrosans text-lg font-bold"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (!item) return;
                  const answer = item.querySelector('.faq-answer');
                  const arrow = item.querySelector('.faq-arrow');
                  if (!answer || !arrow) return;
                  answer.classList.toggle('active');
                  arrow.classList.toggle('active');
                }}
              >
                <h3 className="font-metrosans text-lg font-bold">{t('faq_question_four')}</h3>
                <svg 
                  className="faq-arrow"
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 16 16" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                </svg>
              </div>
              <div className="faq-answer">
                <p className="font-metrosans text-black ">{t('faq_answer_four')}</p>
              </div>
            </div>

            <div className="faq-item">
              <div 
                className="faq-question font-metrosans text-lg font-bold"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (!item) return;
                  const answer = item.querySelector('.faq-answer');
                  const arrow = item.querySelector('.faq-arrow');
                  if (!answer || !arrow) return;
                  answer.classList.toggle('active');
                  arrow.classList.toggle('active');
                }}
              >
                <h3 className="font-metrosans text-lg font-bold">{t('faq_question_five')}</h3>
                <svg 
                  className="faq-arrow"
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 16 16" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                </svg>
              </div>
              <div className="faq-answer">
                <p className="font-metrosans text-black ">{t('faq_answer_five')}</p>
              </div>
            </div>

            <div className="faq-item">
              <div 
                className="faq-question font-metrosans text-lg font-bold"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (!item) return;
                  const answer = item.querySelector('.faq-answer');
                  const arrow = item.querySelector('.faq-arrow');
                  if (!answer || !arrow) return;
                  answer.classList.toggle('active');
                  arrow.classList.toggle('active');
                }}
              >
                <h3 className="font-metrosans text-lg font-bold">{t('faq_question_six')}</h3>
                <svg 
                  className="faq-arrow"
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 16 16" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                </svg>
              </div>
              <div className="faq-answer">
                <p className="font-metrosans text-black ">{t('faq_answer_six')}</p>
              </div>
            </div>

            <div className="faq-item">
              <div 
                className="faq-question font-metrosans text-lg font-bold"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (!item) return;
                  const answer = item.querySelector('.faq-answer');
                  const arrow = item.querySelector('.faq-arrow');
                  if (!answer || !arrow) return;
                  answer.classList.toggle('active');
                  arrow.classList.toggle('active');
                }}
              >
                <h3 className="font-metrosans text-lg font-bold">{t('faq_question_seven')}</h3>
                <svg 
                  className="faq-arrow"
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 16 16" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                </svg>
              </div>
              <div className="faq-answer">
                <p className="font-metrosans text-black ">{t('faq_answer_seven')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
    )
}