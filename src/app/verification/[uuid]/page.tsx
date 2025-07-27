import { getBatchIdFromUUID, getBeekeeperInfo, getProductInfo, getRegionInfo, getUserEmail, getBatchInfo, getIngredientsInfo } from '@/actions/actions';
import { notFound } from 'next/navigation';
import BatchPageClient, { IngredientData } from '../../../components/BatchPageClient';

export const dynamic = 'force-dynamic';

export default async function BatchPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) notFound();

  const [beekeeperData, productData, regionData, batchData, ingredientsData] = await Promise.all([
    getBeekeeperInfo(uuid),
    getProductInfo(uuid),
    getRegionInfo(uuid),
    getBatchInfo(uuid),
    getIngredientsInfo(uuid)
  ]);

  const email = await getUserEmail();
  const locale = "en";

  return (
    <BatchPageClient
      beekeeperData={beekeeperData}
      productData={productData}
      regionData={regionData}
      batchData={batchData}
      ingredientsData={ingredientsData as IngredientData}
      locale={locale}
      uuid={uuid}
      email={email}
    />
  );
}
