'use client';

import { BuilderComponent } from './builder-provider';
import { useEffect, useState } from 'react';
import Faq from './faq';
import Footer from './footer';
import '../builder-registry';
import { useTranslation } from 'react-i18next';

type BeekeeperData = {
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

type ProductData = {
  uuid: string;
  product: {
    id: string;
    name: string;
    mgo_level: number;
    size: string;
    title: string;
    title_arabic: string;
    image_url: string;
    junip_id: string;
  } | null;
} | null;

type RegionData = {
  uuid: string;
  region: {
    id: string;
    title: string;
    title_arabic: string;
    description: string;
    description_arabic: string;
    region_image: string;
    map_image: string;
  } | null;
} | null;

type BatchData = {
    id: string;
    mgo_rating: number;
    umf_rating: number;
    test_date: string;
    notes: string;
    potency_report_url: string;
    purity_report_url: string;
    notes_image_url: string;
} | null;

interface BuilderWrapperProps {
  beekeeperData: BeekeeperData;
  productData: ProductData;
  regionData: RegionData;
  batchData: BatchData;
  locale?: 'en' | 'ar';
}

export default function BuilderWrapper({ 
  beekeeperData, 
  productData, 
  regionData,
  batchData
}: Omit<BuilderWrapperProps, 'locale'>) {
  const [isContentReady, setIsContentReady] = useState(false);
  const { t, i18n } = useTranslation();

  // Use i18n.language as the only source of truth
  const normalizedLocale = i18n.language?.split('-')[0] || 'en';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!beekeeperData || !productData || !regionData || !batchData || !isContentReady) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent 
          model="figma-imports"
          entry="0e778a310c624c7d89c937f6da148163"
          data={{
              mgo_level: productData?.product?.mgo_level || 0,
              mgo_rating: batchData?.mgo_rating || 0,
              translations: {
                title: t('header_title'),
                mgo_label: t('header_mgo_label'),
                measurements: t('measurements')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent 
          model="figma-imports"
          entry="6c6e6144f9744b46bfa21f4a033c807d"
          data={{
              name: productData?.product?.name || null,
              mgo_level: productData?.product?.mgo_level || 0,
              size: productData?.product?.size || null,
              title: (normalizedLocale === 'ar' ? productData?.product?.title_arabic : productData?.product?.title) || null,
              image_url: productData?.product?.image_url || null,
              translations: {
                title: t('jar_title'),
                subtitle: t('jar_subtitle'),
                digestive_benefit: t('jar_digestive_benefit'),
                immune_benefit: t('jar_immune_benefit'),
                energy_benefit: t('jar_energy_benefit'),
                section_one: t('jar_section_one'),
                section_two: t('jar_section_two'),
                section_three: t('jar_section_three'),
                section_four: t('jar_section_four'),
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent 
          model="figma-imports"
          entry="3b9c9f38a3384bffb3c3a0d2f41d9de5"
          data={{
              mgo_rating: batchData?.mgo_rating || 0,
              umf_rating: batchData?.umf_rating || 0,
              potency_report_url: batchData?.potency_report_url || null,
              purity_report_url: batchData?.purity_report_url || null,
              translations: {
                title: t('testresults_title'),
                potency: t('testresults_potency'),
                purity: t('testresults_purity'),
                mgo: t('testresults_mgo'),
                umf: t('testresults_umf'),
                glyphosate: t('testresults_glyphosate'),
                residue: t('testresults_residue'),
                residue_description: t('testresults_residue_description'),
                report: t('testresults_report'),
                measurements: t('measurements')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
          entry="5b6e8dab0aaa440cbda0584208e3679e"
          data={{
              name: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.title_arabic : beekeeperData?.beekeeper?.title) || null,
              bio: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.description_arabic : beekeeperData?.beekeeper?.description) || null,
              video_url: beekeeperData?.beekeeper?.video_url || null,
              image_url: beekeeperData?.beekeeper?.image_url || null,
              translations: {
                title: t('beekeeper_title')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent 
          model="figma-imports"
          entry="91bd7c8f1d3745968bc36256894dd807"
          data={{
              title: (normalizedLocale === 'ar' ? regionData?.region?.title_arabic : regionData?.region?.title) || null,
              description: (normalizedLocale === 'ar' ? regionData?.region?.description_arabic : regionData?.region?.description) || null,
              region_image: regionData?.region?.region_image || null,
              map_image: regionData?.region?.map_image || null,
              translations: {
                title: t('region_title'),
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
          entry="8c0e4b990499491fb5876496d59b61a4"
          data={{
              name: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.title_arabic : beekeeperData?.beekeeper?.title) || null,
              bio: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.description_arabic : beekeeperData?.beekeeper?.description) || null,
              test_date: batchData?.test_date || null,
              region: (normalizedLocale === 'ar' ? regionData?.region?.title_arabic : regionData?.region?.title) || null,
              notes: batchData?.notes || null,
              notes_image_url: batchData?.notes_image_url || null,
              translations: {
                title: t('tastingnotes_title')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      {/* CUSTOM REVIEW FORMS THAT DON'T WORK WITH JUNIP

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
            key={`product-${normalizedLocale}-${productData?.product?.name}`}
          model="figma-imports"
            entry="a53ec244e93644288e72c5f28326353b"
            data={{
              name: (normalizedLocale === 'ar' ? productData?.product?.title_arabic : productData?.product?.title) || null,
              image_url: productData?.product?.image_url || null,
              translations: {
                title: t('textreview_title')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

        <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
            entry="a53ec244e93644288e72c5f28326353b"
            data={{
              name: productData?.product?.name || null,
              image_url: productData?.product?.image_url || null,
              translations: {
                title: t('textreview_title')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

        <div className="w-full font-moretmnk">
        <BuilderComponent
          key={normalizedLocale}
          model="figma-imports"
            entry="1c3e834ebc814b43ae3fa8189d7089bc"
            data={{
              translations: {
                title: t('review_title'),
                description: t('review_description')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      */}

<div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
          entry="43566cc14e7c45b48898c7449d078273"
          data={{
            link: `https://junip.co/forms/review/onsite/product?product_id=${productData?.product?.junip_id}&store_key=piDpeYVw4zaChuvPmrXsejph`,
              translations: {
                title: t('review_link_title')
              }
            }}
            locale={normalizedLocale}
        />
            </div>
          
        {/* Full width sections */}
        
        <Faq locale={normalizedLocale} />

        <div className={`w-screen relative font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
            entry="a23f884d0eda44afb36a8de6957fa9a0"
            data={{
              translations: {
                title: t('promo_title'),
                description: t('promo_description'),
              }
            }}
            locale={normalizedLocale}
        />
      </div>
    
        <Footer />
      </div>
    </>
  );
}