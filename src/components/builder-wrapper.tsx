'use client';

import { BuilderComponent } from './builder-provider';
import { useEffect, useState } from 'react';

type BeekeeperData = {
  uuid: string;
  beekeeper: {
    id: string;
    title: string;
    description: string;
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
    review_link: string;
  } | null;
} | null;

type RegionData = {
  uuid: string;
  region: {
    id: string;
    title: string;
    description: string;
    main_image_url: string;
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
  locale?: 'en' | 'fr' | 'de' | 'es' | 'sv';
}

export default function BuilderWrapper({ 
  beekeeperData, 
  productData, 
  regionData,
  batchData
}: BuilderWrapperProps) {
  const [isContentReady, setIsContentReady] = useState(false);

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
      <div className="w-full font-moretmnk">
        <BuilderComponent 
          model="figma-imports"
          entry="0e778a310c624c7d89c937f6da148163"
          data={{
            mgo_level: batchData?.mgo_rating || 0
          }}
        />
      </div>

      <div className="w-full font-moretmnk">
        <BuilderComponent 
          model="figma-imports"
          entry="6c6e6144f9744b46bfa21f4a033c807d"
          data={{
            name: productData?.product?.name || '',
            mgo_level: productData?.product?.mgo_level|| 0,
            size: productData?.product?.size || '',
            title: productData?.product?.title || '',
            title_arabic: productData?.product?.title_arabic || '',
            image_url: productData?.product?.image_url || ''
          }}
        />
      </div>

      <div className="w-full font-moretmnk">
        <BuilderComponent 
          model="figma-imports"
          entry="3b9c9f38a3384bffb3c3a0d2f41d9de5"
          data={{
            mgo_rating: batchData?.mgo_rating,
            umf_rating: batchData?.umf_rating,
            potency_report_url: batchData?.potency_report_url,
            purity_report_url: batchData?.purity_report_url
          }}
        />
      </div>

      <div className="w-full font-moretmnk">
        <BuilderComponent
          model="figma-imports"
          entry="5b6e8dab0aaa440cbda0584208e3679e"
          data={{
            name: beekeeperData?.beekeeper?.title || '',
            bio: beekeeperData?.beekeeper?.description || ''
          }}
        />
      </div>

      <div className="w-full font-moretmnk">
        <BuilderComponent 
          model="figma-imports"
          entry="91bd7c8f1d3745968bc36256894dd807"
          data={{
            title: regionData?.region?.title || '',
            description: regionData?.region?.description || '',
            main_image_url: regionData?.region?.main_image_url || ''
          }}
        />
      </div>

      <div className="w-full font-moretmnk">
        <BuilderComponent
          model="figma-imports"
          entry="8c0e4b990499491fb5876496d59b61a4"
          data={{
            name: beekeeperData?.beekeeper?.title || '',
            bio: beekeeperData?.beekeeper?.description || '',
            test_date: batchData?.test_date || '',
            region: regionData?.region?.title || '',
            notes: batchData?.notes || '',
            notes_image_url: batchData?.notes_image_url || ''
          }}
        />
      </div>

      {/* Full width sections */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] font-moretmnk">
        <BuilderComponent
          model="figma-imports"
          entry="43566cc14e7c45b48898c7449d078273"
        />
      </div>

      
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] font-moretmnk">
        <BuilderComponent
          model="figma-imports"
          entry="a23f884d0eda44afb36a8de6957fa9a0"
        />
      </div>

      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] font-moretmnk">
        <BuilderComponent
          model="figma-imports"
          entry="6dc34d4b9c264802adb91ef169ed6a04"
        />
      </div>

      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] font-moretmnk">
        <BuilderComponent
          model="figma-imports"
          entry="9ff099e964f84f5eac21f5b2e41a7fa3"
        />
      </div>
    </>
  );
}