'use client';

import { BuilderComponent } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { builder } from '@/builder-registry';
import '../builder-registry'; // Import the registry to ensure components are registered
import '../i18n';
import { BuilderContext } from '@builder.io/sdk-react';

interface BuilderProviderProps {
  children: React.ReactNode;
  preTickConsent?: boolean;
}

export function BuilderProvider({ children, preTickConsent = false }: BuilderProviderProps) {
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

  return (
    <BuilderContext.Provider value={{ preTickConsent }}>
      {children}
    </BuilderContext.Provider>
  );
}

export { BuilderComponent }; 