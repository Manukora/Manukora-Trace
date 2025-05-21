import { notFound } from 'next/navigation';
import { checkUUIDExists, getUserEmail, getBeekeeperInfo, getProductInfo, getRegionInfo } from '@/actions/actions';
import EmailForm from '@/components/email-form';
import BuilderWrapper from '@/components/builder-wrapper';

export default async function BatchPage({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  
  const uuidExists = await checkUUIDExists(uuid);
  
  if (!uuidExists) {
    notFound();
  }
  
  const email = await getUserEmail();
  
  if (!email) {
    return <EmailForm uuid={uuid} />;
  }

  const [beekeeperData, productData, regionData] = await Promise.all([
    getBeekeeperInfo(uuid),
    getProductInfo(uuid),
    getRegionInfo(uuid)
  ]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 py-8">
      <div className="w-full max-w-sm px-4 mx-auto">
        <BuilderWrapper 
          beekeeperData={beekeeperData}
          productData={productData}
          regionData={regionData}
        />
      </div>
    </div>
  );
}
