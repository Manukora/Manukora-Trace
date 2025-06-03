'use client';

import { BuilderComponent } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { builder } from '@/builder-registry';

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
      builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}

export { BuilderComponent }; 