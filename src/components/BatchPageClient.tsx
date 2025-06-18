'use client';
import { useState } from 'react';
import BuilderWrapper from '@/components/builder-wrapper';
import EmailForm from '@/components/email-form';
import DragUp from '@/components/drag-up';

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

export default function BatchPageClient({ beekeeperData, productData, regionData, batchData, locale, uuid, email }: {
  beekeeperData: unknown;
  productData: unknown;
  regionData: unknown;
  batchData: unknown;
  locale: string;
  uuid: string;
  email: string | null;
}) {
  const [showSheet, setShowSheet] = useState(true);

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-50">
      <div className="w-full">
        <BuilderWrapper
          beekeeperData={beekeeperData as BeekeeperData}
          productData={productData as ProductData}
          regionData={regionData as RegionData}
          batchData={batchData as BatchData}
        />
      </div>
      <DragUp open={showSheet && !email} onClose={() => setShowSheet(false)} />
      {!email && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <EmailForm locale={locale} uuid={uuid} />
        </div>
      )}
    </div>
  );
} 