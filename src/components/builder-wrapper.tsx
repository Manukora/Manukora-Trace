import { BuilderComponent } from './builder-provider';
import Faq from './faq';
import Footer from './footer';
import '../builder-registry';
import { useTranslation } from 'react-i18next';
import Review from './review';
import Dropdown from './dropdown';
import { BeekeeperData, ProductData, RegionData, BatchData, IngredientData } from './BatchPageClient';

interface BuilderWrapperProps {
  beekeeperData: BeekeeperData;
  productData: ProductData;
  regionData: RegionData;
  batchData: BatchData;
  ingredientsData: IngredientData;
  locale?: 'en' | 'ar';
}

export default function BuilderWrapper({ 
  beekeeperData, 
  productData, 
  regionData,
  batchData,
  ingredientsData
}: Omit<BuilderWrapperProps, 'locale'>) {
  const { t, i18n } = useTranslation();

  // Use i18n.language as the only source of truth
  const normalizedLocale = i18n.language?.split('-')[0] || 'en';

  if (!beekeeperData || !productData || !regionData || !batchData || !ingredientsData) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent 
          model="figma-imports"
          entry="0e778a310c624c7d89c937f6da148163"
          data={{
              mgo_level: productData?.product?.mgo_level || 0,
              mgo_rating: batchData?.mgo_rating || 0,
              title: productData?.product?.title,
              translations: {
                title: t('header_title'),
                mgo_label: t('header_mgo_label'),
                measurements: t('measurements')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent 
          model="figma-imports"
          entry="6c6e6144f9744b46bfa21f4a033c807d"
          data={{
              mgo_level: productData?.product?.mgo_level || 0,
              size: productData?.product?.size || null,
              title: productData?.product?.title, // This is the title that determines styling
              title_text: (normalizedLocale === 'ar' ? productData?.product?.title_arabic : productData?.product?.title) || null,
              image_url: productData?.product?.image_url || null,
              ingredients: ingredientsData != null,
              color: "#FFFFFF",
              translations: {
                title: ingredientsData == null ? t('jar_title') : t('jar_title_ingredients'),
                subtitle: t('jar_subtitle'),
                digestive_benefit: t('jar_digestive_benefit'),
                immune_benefit: t('jar_immune_benefit'),
                energy_benefit: t('jar_energy_benefit'),
                section_one: t('jar_section_one'),
                section_two: t('jar_section_two'),
                section_three: t('jar_section_three'),
                section_four: t('jar_section_four'),
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      {ingredientsData != null ? (
        <Dropdown title_text={normalizedLocale === 'ar' ? "عسل" : "Honey"} title="Honey">
          <div className="max-w-[350px] mx-auto">
            <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
              <BuilderComponent 
                model="figma-imports"
                entry="3b9c9f38a3384bffb3c3a0d2f41d9de5"
                data={{
                    mgo_rating: batchData?.mgo_rating || 0,
                    umf_rating: batchData?.umf_rating || 0,
                    potency_report_url: batchData?.potency_report_url || null,
                    purity_report_url: batchData?.purity_report_url || null,
                    ingredients: true,
                    translations: {
                      title: t('testresults_title'),
                      potency: t('testresults_potency'),
                      purity: t('testresults_purity'),
                      mgo: t('testresults_mgo'),
                      umf: t('testresults_umf'),
                      glyphosate: t('testresults_glyphosate'),
                      residue: t('testresults_residue'),
                      residue_description: t('testresults_residue_description'),
                      potency_report: t('testresults_potency_report'),
                      purity_report: t('testresults_purity_report'),
                      measurements: t('measurements'),
                      digestive_benefit: t('jar_digestive_benefit'),
                      immune_benefit: t('jar_immune_benefit'),
                      energy_benefit: t('jar_energy_benefit'),
                    }
                  }}
                  locale={normalizedLocale}
              />
            </div>

            <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
              <BuilderComponent
                model="figma-imports"
                entry="5b6e8dab0aaa440cbda0584208e3679e"
                data={{
                    title: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.title_arabic : beekeeperData?.beekeeper?.title) || null,
                    bio: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.description_arabic : beekeeperData?.beekeeper?.description) || null,
                    video_url: beekeeperData?.beekeeper?.video_url || null,
                    image_url: beekeeperData?.beekeeper?.image_url || null,
                    translations: {
                      title: t('beekeeper_title')
                    }
                  }}
                  locale={normalizedLocale}
              />
            </div>

            <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
              <BuilderComponent 
                model="figma-imports"
                entry="91bd7c8f1d3745968bc36256894dd807"
                data={{
                    title: (normalizedLocale === 'ar' ? regionData?.region?.title_arabic : regionData?.region?.title) || null,
                    description: (normalizedLocale === 'ar' ? regionData?.region?.description_arabic : regionData?.region?.description) || null,
                    region_image: regionData?.region?.region_image_url || null,
                    region_image_2: regionData?.region?.region_image_url_2 || null,
                    region_image_3: regionData?.region?.region_image_url_3 || null,
                    map_image: regionData?.region?.map_image_url || null,
                    translations: {
                      title: t('region_title'),
                    }
                  }}
                  locale={normalizedLocale}
              />
            </div>

            <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
              <BuilderComponent 
                model="figma-imports"
                entry="707e1513effa4fbf89844095e04d65c5"
                data={{
                    translations: {
                      title: t('additionalfacts_title'),
                      description: t('additionalfacts_description'),
                    }
                  }}
                  locale={normalizedLocale}
              />
            </div>

            <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
              <BuilderComponent
                model="figma-imports"
                entry="8c0e4b990499491fb5876496d59b61a4"
                data={{
                    title: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.title_arabic : beekeeperData?.beekeeper?.title) || null,
                    bio: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.description_arabic : beekeeperData?.beekeeper?.description) || null,
                    test_date: batchData?.test_date || null,
                    region: (normalizedLocale === 'ar' ? regionData?.region?.title_arabic : regionData?.region?.title) || null,
                    notes: normalizedLocale === 'ar' ? batchData?.notes_arabic : batchData?.notes || null,
                    notes_image_url: batchData?.notes_image_url || null,
                    translations: {
                      title: t('tastingnotes_title')
                    }
                  }}
                  locale={normalizedLocale}
              />
            </div>
          </div>
        </Dropdown>
      ) : (
        <div className="w-full bg-[#fbf7ec] p-0 m-0 py-4">
        <div className="max-w-[350px] mx-auto">
          <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
            <BuilderComponent 
              model="figma-imports"
              entry="3b9c9f38a3384bffb3c3a0d2f41d9de5"
              data={{
                  mgo_rating: batchData?.mgo_rating || 0,
                  umf_rating: batchData?.umf_rating || 0,
                  potency_report_url: batchData?.potency_report_url || null,
                  purity_report_url: batchData?.purity_report_url || null,
                  translations: {
                    title: t('testresults_title'),
                    potency: t('testresults_potency'),
                    purity: t('testresults_purity'),
                    mgo: t('testresults_mgo'),
                    umf: t('testresults_umf'),
                    glyphosate: t('testresults_glyphosate'),
                    residue: t('testresults_residue'),
                    residue_description: t('testresults_residue_description'),
                    report: t('testresults_report'),
                    measurements: t('measurements')
                  }
                }}
                locale={normalizedLocale}
            />
          </div>

          <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
            <BuilderComponent
              model="figma-imports"
              entry="5b6e8dab0aaa440cbda0584208e3679e"
              data={{
                  title: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.title_arabic : beekeeperData?.beekeeper?.title) || null,
                  bio: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.description_arabic : beekeeperData?.beekeeper?.description) || null,
                  video_url: beekeeperData?.beekeeper?.video_url || null,
                  image_url: beekeeperData?.beekeeper?.image_url || null,
                  translations: {
                    title: t('beekeeper_title')
                  }
                }}
                locale={normalizedLocale}
            />
          </div>

          <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
            <BuilderComponent 
              model="figma-imports"
              entry="91bd7c8f1d3745968bc36256894dd807"
              data={{
                  title: (normalizedLocale === 'ar' ? regionData?.region?.title_arabic : regionData?.region?.title) || null,
                  description: (normalizedLocale === 'ar' ? regionData?.region?.description_arabic : regionData?.region?.description) || null,
                  region_image: regionData?.region?.region_image_url || null,
                  region_image_2: regionData?.region?.region_image_url_2 || null,
                  region_image_3: regionData?.region?.region_image_url_3 || null,
                  map_image: regionData?.region?.map_image_url || null,
                  translations: {
                    title: t('region_title'),
                  }
                }}
                locale={normalizedLocale}
            />
          </div>

          <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
            <BuilderComponent 
              model="figma-imports"
              entry="707e1513effa4fbf89844095e04d65c5"
              data={{
                  translations: {
                    title: t('additionalfacts_title'),
                    description: t('additionalfacts_description'),
                  }
                }}
                locale={normalizedLocale}
            />
          </div>

          <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
            <BuilderComponent
              model="figma-imports"
              entry="8c0e4b990499491fb5876496d59b61a4"
              data={{
                  title: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.title_arabic : beekeeperData?.beekeeper?.title) || null,
                  bio: (normalizedLocale === 'ar' ? beekeeperData?.beekeeper?.description_arabic : beekeeperData?.beekeeper?.description) || null,
                  test_date: batchData?.test_date || null,
                  region: (normalizedLocale === 'ar' ? regionData?.region?.title_arabic : regionData?.region?.title) || null,
                  notes: batchData?.notes || null,
                  notes_image_url: batchData?.notes_image_url || null,
                  translations: {
                    title: t('tastingnotes_title')
                  }
                }}
                locale={normalizedLocale}
            />
          </div>
        </div>
        </div>
      )}

{ingredientsData != null && ingredientsData.map((ingredientWrapper) => (
      <Dropdown key={ingredientWrapper.ingredient.id} title_text={normalizedLocale === 'ar' ? ingredientWrapper.ingredient.title_arabic : ingredientWrapper.ingredient.title} title={ingredientWrapper.ingredient.title}>
        <div key={`ingredient-${ingredientWrapper.ingredient.id}`} className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
          <BuilderComponent
            model="figma-imports"
            entry="df4c031c63b445df9a26f123e7583076"
            data={{
              image: ingredientWrapper.ingredient.ingredient_image_url,
              story: normalizedLocale === 'ar' ? ingredientWrapper.ingredient.story_arabic : ingredientWrapper.ingredient.story,
              benefits: normalizedLocale === 'ar' ? ingredientWrapper.ingredient.benefits_arabic : ingredientWrapper.ingredient.benefits,
              specs: normalizedLocale === 'ar' ? ingredientWrapper.ingredient.specs_arabic : ingredientWrapper.ingredient.specs,
              region: ingredientWrapper.ingredient.region_name,
              region_image: ingredientWrapper.ingredient.region_image_url,
            }}
            locale={normalizedLocale}
          />
        </div>
      </Dropdown>
))}

      {/* CUSTOM REVIEW FORMS THAT DON'T WORK WITH JUNIP

      <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
            key={`product-${normalizedLocale}-${productData?.product?.name}`}
          model="figma-imports"
            entry="a53ec244e93644288e72c5f28326353b"
            data={{
              title: (normalizedLocale === 'ar' ? productData?.product?.title_arabic : productData?.product?.title) || null,
              image_url: productData?.product?.image_url || null,
              translations: {
                title: t('textreview_title')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

        <div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
            entry="a53ec244e93644288e72c5f28326353b"
            data={{
              title: productData?.product?.name || null,
              image_url: productData?.product?.image_url || null,
              translations: {
                title: t('textreview_title')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

        <div className="w-full font-moretmnk">
        <BuilderComponent
          key={normalizedLocale}
          model="figma-imports"
            entry="1c3e834ebc814b43ae3fa8189d7089bc"
            data={{
              translations: {
                title: t('review_title'),
                description: t('review_description')
              }
            }}
            locale={normalizedLocale}
        />
      </div>

      

<div className={`w-full font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
          entry="43566cc14e7c45b48898c7449d078273"
          data={{
            link: `https://junip.co/forms/review/onsite/product?product_id=${productData?.product?.junip_id}&store_key=piDpeYVw4zaChuvPmrXsejph`,
              translations: {
                linktitle: t('review_linktitle') === 'review_linktitle' ? 'Leave a review' : t('review_linktitle')
              }
            }}
            locale={normalizedLocale}
        />
            </div>
            */}

            <Review locale={normalizedLocale} reviewLink={`https://junip.co/forms/review/onsite/product?product_id=${productData?.product?.junip_id}&store_key=piDpeYVw4zaChuvPmrXsejph`} reviewTitle={t('review_linktitle')} />
          
        {/* Full width sections */}
        
        <Faq locale={normalizedLocale} />
        {ingredientsData == null ? (
        <div className={`w-screen relative font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
        <BuilderComponent
          model="figma-imports"
            entry="a23f884d0eda44afb36a8de6957fa9a0"
            data={{
              translations: {
                title: t('promo_title'),
                description: t('promo_description'),
              }
            }}
            locale={normalizedLocale}
        />
      </div>
      ) : <div className={`w-screen relative font-moretmnk ${normalizedLocale === 'ar' ? 'text-right' : 'text-left'}`} dir={normalizedLocale === 'ar' ? 'rtl' : 'ltr'}>
      <BuilderComponent
        model="figma-imports"
          entry="b9d63c10c8b34a268ec8e7733aa57d36"
          data={{
            translations: {
              title: t('promo_title'),
              description: t('promo_description'),
            }
          }}
          locale={normalizedLocale}
      />
    </div>}
        <Footer />
      </div>
    </>
  );
}