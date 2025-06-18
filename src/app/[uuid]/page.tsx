import { getBatchIdFromUUID, getBeekeeperInfo, getProductInfo, getRegionInfo, getUserEmail, getBatchInfo } from '@/actions/actions';
import { notFound } from 'next/navigation';
import BatchPageClient from '../../components/BatchPageClient';

export default async function BatchPage({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) notFound();

  const [beekeeperData, productData, regionData, batchData] = await Promise.all([
    getBeekeeperInfo(uuid),
    getProductInfo(uuid),
    getRegionInfo(uuid),
    getBatchInfo(uuid)
  ]);

  const email = await getUserEmail();
  const locale = "en";

  return (
    <BatchPageClient
      beekeeperData={beekeeperData}
      productData={productData}
      regionData={regionData}
      batchData={batchData}
      locale={locale}
      uuid={uuid}
      email={email}
    />
  );
}
