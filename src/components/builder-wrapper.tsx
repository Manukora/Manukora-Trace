'use client';

import { BuilderComponent } from '@builder.io/react';

type BeekeeperData = {
  uuid: string;
  beekeeper: {
    id: string;
    name: string;
    bio: string;
  }[] | null;
} | null;

type ProductData = {
  uuid: string;
  product: {
    id: string;
    name: string;
    mgo_level: number;
    size: string;
  }[] | null;
} | null;

type RegionData = {
  uuid: string;
  region: {
    id: string;
    name: string;
    description: string;
  }[] | null;
} | null;

interface BuilderWrapperProps {
  beekeeperData: BeekeeperData;
  productData: ProductData;
  regionData: RegionData;
}

export default function BuilderWrapper({ beekeeperData, productData, regionData }: BuilderWrapperProps) {
  return (
    <>
      <div className="w-full mb-6">
        <BuilderComponent 
          model="ProductCard"
          data={productData}
        />
      </div>

      <div className="w-full mb-6">
        <BuilderComponent 
          model="BeekeeperCard"
          data={beekeeperData}
        />
      </div>

      <div className="w-full">
        <BuilderComponent 
          model="RegionCard"
          data={regionData}
        />
      </div>
    </>
  );
} 