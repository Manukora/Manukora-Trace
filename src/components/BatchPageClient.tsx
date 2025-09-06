'use client';
import { useState } from 'react';
import BuilderWrapper from '@/components/builder-wrapper';
import EmailForm from '@/components/email-form';
import DragUp from '@/components/drag-up';
import { LanguageSwitcher } from '@/components/language-switcher';

export type BeekeeperData = {
  uuid: string;
  beekeeper: {
    id: string;
    title: string;
    title_arabic: string;
    description: string;
    description_arabic: string;
    video_url: string;
    image_url: string;
  } | null;
} | null;

export type ProductData = {
  uuid: string;
  product: {
    id: string;
    company_id: string;
    mgo_level: number;
    size: string;
    title: string;
    title_arabic: string;
    description: string;
    image_url: string;
    junip_id: string;
    review_enabled: boolean;
    purity_enabled: boolean;
  } | null;
} | null;

export type RegionData = {
  uuid: string;
  region: {
    id: string;
    title: string;
    title_arabic: string;
    description: string;
    description_arabic: string;
    region_image_url: string;
    region_image_url_2: string;
    region_image_url_3: string;
    map_image_url: string;
  } | null;
} | null;

export type BatchData = {
  id: string;
  mgo_rating: number;
  umf_rating: number;
  test_date: string;
  notes: string;
  notes_arabic: string;
  potency_report_url: string;
  purity_report_url: string;
  notes_image_url: string;
  is_arabic: boolean;
} | null;

export type IngredientData = {
  ingredient: {
    id: string;
    title: string;
    title_arabic: string;
    region_name: string;
    story: string;
    story_arabic: string;
    benefits: string;
    benefits_arabic: string;
    specs: string;
    specs_arabic: string;
    ingredient_image_url: string;
    region_image_url: string;
  };
}[] | null;

export type FAQData = {
  faq: {
  id: string;
  question: string;
  answer: string;
    question_arabic: string;
    answer_arabic: string;
  };
  order: number;
}[] | null;

export type CompanyData = {
  id: string;
  name: string;
  slug: string;
  details: string;
  contact: string;
  address: string;
} | null;

export default function BatchPageClient({ beekeeperData, productData, regionData, batchData, ingredientsData, faqData, companyData, locale, uuid, email, preTickConsent = false }: {
  beekeeperData: BeekeeperData;
  productData: ProductData;
  regionData: RegionData;
  batchData: BatchData;
  ingredientsData: IngredientData;
  faqData: FAQData;
  companyData: CompanyData;
  locale: string;
  uuid: string;
  email: string | null;
  preTickConsent: boolean;
}) {
  const [showSheet, setShowSheet] = useState(true);

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-50">
      {locale === 'ar' && (
        <div className="fixed top-4 right-4 z-60">
          <LanguageSwitcher />
        </div>
      )}
      <div className="w-full">
        <BuilderWrapper
          beekeeperData={beekeeperData as BeekeeperData}
          productData={productData as ProductData}
          regionData={regionData as RegionData}
          ingredientsData={ingredientsData as IngredientData}
          batchData={batchData as BatchData}
          faqData={faqData as FAQData}
          companyData={companyData as CompanyData}
        />
      </div>
      <DragUp open={showSheet && !email} onClose={() => setShowSheet(false)} />
      {!email && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <EmailForm locale={locale} uuid={uuid} preTickConsent={preTickConsent} />
        </div>
      )}
    </div>
  );
} 