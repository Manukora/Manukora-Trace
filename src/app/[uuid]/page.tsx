import { checkUUIDExists, getBeekeeperInfo, getProductInfo, getRegionInfo, getUserEmail, getBatchInfo } from '@/actions/actions';
import BuilderWrapper from '@/components/builder-wrapper';
import EmailForm from '@/components/email-form';
import { notFound } from 'next/navigation';

export default async function BatchPage({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;

  const exists = await checkUUIDExists(uuid);
  if (!exists) {
    notFound();
  }

  const [beekeeperData, productData, regionData, batchData] = await Promise.all([
    getBeekeeperInfo(uuid),
    getProductInfo(uuid),
    getRegionInfo(uuid),
    getBatchInfo(uuid)
  ]);

  const email = await getUserEmail();
  
  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-50">
      <div className="w-full">
        <BuilderWrapper 
          beekeeperData={beekeeperData}
          productData={productData}
          regionData={regionData}
          batchData={batchData}
        />
      </div>
      {!email && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <EmailForm uuid={uuid} />
        </div>
      )}
    </div>
  );
}
