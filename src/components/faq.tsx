'use client'

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Faq({ locale }: { locale: string }) {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (locale) {
          i18n.changeLanguage(locale);
        }
      }, [locale, i18n]);

    return (
        <div className={`w-screen relative bg-[#f1e5cf] ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="faq-section max-w-[1200px] mx-auto px-4 pt-12">
          <div className="faq-title">
            <h2 className="font-moretmnk">{t('faq_title')}</h2>
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
      </div>)
}