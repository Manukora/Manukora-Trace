'use client';

import { saveUserEmail } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { BuilderComponent } from '@builder.io/react';

interface EmailFormProps {
  uuid: string;
}

export default function EmailForm({ uuid }: EmailFormProps) {
  const router = useRouter();

  const handleEmailSubmit = async (email: string) => {
    try {
      await saveUserEmail(email);
      router.push(`/${uuid}`);
    } catch {
      return false;
    }
    return true;
  };

  return (
    <div className="w-full">
      <BuilderComponent 
        model="email-form"
        data={{
          onSubmit: handleEmailSubmit
        }}
      />
    </div>
  );
}