import { getBatchIdFromUUID, getBeekeeperInfo, getProductInfo, getRegionInfo, getUserEmail, getBatchInfo, getIngredientsInfo, saveScanError, getFaqsInfo, getCompanyInfo } from '@/actions/actions';
import { notFound } from 'next/navigation';
import BatchPageClient, { CompanyData, FAQData, IngredientData } from '../../../components/BatchPageClient';
import { shouldPreTickConsent } from '@/utils/geo-consent';

export const dynamic = 'force-dynamic';

export default async function BatchPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) {
    await saveScanError(uuid);
    notFound();
  }

  const [beekeeperData, productData, regionData, batchData, ingredientsData, faqData, companyData, preTickConsent] = await Promise.all([
    getBeekeeperInfo(uuid),
    getProductInfo(uuid),
    getRegionInfo(uuid),
    getBatchInfo(uuid),
    getIngredientsInfo(uuid),
    getFaqsInfo(uuid),
    getCompanyInfo(uuid),
    shouldPreTickConsent()
  ]);

  const email = await getUserEmail();
  const locale = await batchData?.is_arabic ? 'ar' : 'en';

  return (
    <BatchPageClient
      beekeeperData={beekeeperData}
      productData={productData}
      regionData={regionData}
      batchData={batchData}
      ingredientsData={ingredientsData as IngredientData}
      faqData={faqData as FAQData}
      companyData={companyData as CompanyData}
      locale={locale}
      uuid={uuid}
      email={email}
      preTickConsent={preTickConsent}
    />
  );
}
