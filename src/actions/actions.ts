"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export async function getBatchIdFromUUID(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});

  const { data: codeData, error: codeError } = await supabase
    .from('individual_codes')
    .select('code_batch_id')
    .eq('id', uuid)
    .maybeSingle();

  if (codeError || !codeData?.code_batch_id) {
    console.error('Error fetching code_batch_id:', codeError);
    return null;
  }

  const { data: batchData, error: batchError } = await supabase
    .from('batchesnew')
    .select('id')
    .eq('code_batch_id', codeData.code_batch_id)
    .maybeSingle();

  if (batchError || !batchData?.id) {
    console.error('Error fetching batch id:', batchError);
    return null;
  }

  return batchData.id;
}

export async function getUserEmail() {
  const cookieStore = await cookies();
  const email = cookieStore.get('user_email');
  return email?.value || null;
}

export async function saveUserEmail(email: string, communications: boolean, uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});


  const { error } = await supabase
  .from('emails')
  .insert({ email: email, code: uuid, product_id: (await getProductInfo(uuid))?.product?.id, batch_id: await getBatchIdFromUUID(uuid), created_at: new Date().toISOString() })
  .select()
  .single();

  if (error) {
    console.error('Error saving user email:', error);
    return false;
  }

  if (communications) {
    //sign up for the newsletter here
    console.log('signing up for the newsletter');
  }

  // @ts-expect-error - cookies() API is typed incorrectly in Next.js
  cookieStore.set('user_email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  return true;
}

export async function getBeekeeperInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batchesnew')
    .select(`
      id,
      beekeeper:beekeeper_id (
        id,
        title,
        title_arabic,
        description,
        description_arabic,
        video_url,
        image_url
      )
    `)
    .eq('id', batchId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching beekeeper info:', error);
    return null;
  }

  return data as { uuid: string; beekeeper: { id: string; title: string; title_arabic: string; description: string; description_arabic: string; video_url: string; image_url: string; } | null; } | null;
}

export async function getProductInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batchesnew')
    .select(`
      id,
      product:product_id (
        id,
        name,
        mgo_level,
        size,
        title,
        title_arabic,
        image_url,
        junip_id
      )
    `)
    .eq('id', batchId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product info:', error);
    return null;
  }

  const product = Array.isArray(data?.product) ? data.product[0] : data?.product;

  return {
    uuid: data?.id,
    product: product ? {
      ...product,
      mgo_level: Number(product.mgo_level)
    } : null
  };
}

export async function getRegionInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batchesnew')
    .select(`
      id,
      region:region_id (
        id,
        title,
        title_arabic,
        description,
        description_arabic,
        region_image,
        map_image
      )
    `)
    .eq('id', batchId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching region info:', error);
    return null;
  }

  return data as { uuid: string; region: { id: string; title: string; title_arabic: string; description: string; description_arabic: string; region_image: string; map_image: string; } | null; } | null;
}

export async function getBatchInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batchesnew')
    .select(`
      id,
      mgo_rating,
      umf_rating,
      test_date,
      notes,
      potency_report_url,
      purity_report_url,
      notes_image_url
    `)
    .eq('id', batchId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching batch info:', error);
    return null;
  }
  return data as { id: string; mgo_rating: number; umf_rating: number; test_date: string; notes: string; potency_report_url: string; purity_report_url: string; notes_image_url: string; } | null;
}