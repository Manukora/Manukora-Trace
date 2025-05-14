import { notFound } from 'next/navigation';
import { checkUUIDExists, getUserEmail } from '@/actions/actions';
import EmailForm from '@/components/email-form';

export default async function BatchPage({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  
  const uuidExists = await checkUUIDExists(uuid);
  
  if (!uuidExists) {
    notFound();
  }
  
  const email = await getUserEmail();
  
  if (!email) {
    return <EmailForm />;
  }
  
  return (
    <h1>Honey info page</h1>
  );
}
