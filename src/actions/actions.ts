"use server"

import { createServerClient } from "@supabase/ssr";
import { cookies } from 'next/headers';
import { BatchData, BeekeeperData, IngredientData, RegionData } from "@/components/BatchPageClient";

export async function getBatchIdFromUUID(uuid: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
  
  const { data: codeData, error: codeError } = await supabase
    .from('individual_codes')
    .select('batch_id')
    .eq('id', uuid)
    .maybeSingle();

  if (codeError || !codeData?.batch_id) {
    console.error('Error fetching batch_id:', codeError);
    return null;
  }

  const { data: batchData, error: batchError } = await supabase
    .from('batches')
    .select('id')
    .eq('id', codeData.batch_id)
    .maybeSingle();

  if (batchError || !batchData?.id) {
    console.error('Error fetching batch id:', batchError);
    return null;
  }

  return batchData.id;
}

export async function getUserEmail() {
  const cookieStore = await cookies();
  const emailCookie = cookieStore.get('user_email');
  return emailCookie?.value || null;
}

export async function saveUserEmail(email: string | null, phone_number: string | null, comms: string, uuid: string, location: string, device: string, os: string) {
  // Create a client with service role key for customer insert
  const cookieStore = await cookies();
  const supabaseAdmin = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  let newsletterSignup = false;
  if (comms === null) { 
    newsletterSignup = false;
  } else {
    newsletterSignup = true;
  }

  // Use supabaseAdmin for customer insert to bypass RLS
  const { error } = await supabaseAdmin
    .from('customers')
    .insert({ 
      email: email, 
      phone_number: phone_number, 
      newsletter: newsletterSignup, 
      code: uuid, 
      location: location,
      device: device,
      os: os,
      product_id: (await getProductInfo(uuid))?.product?.id, 
      batch_id: await getBatchIdFromUUID(uuid), 
      created_at: new Date().toISOString() 
    })
    .select()
    .single();

  if (error || (!email && !phone_number)) {
    console.error('Error saving user email:', error);
    return false;
  }

  const cookieValue = email || phone_number || '';
  cookieStore.set('user_email', cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  return true;
}

export async function getBeekeeperInfo(uuid: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batches')
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

  return data as BeekeeperData;
}

export async function getProductInfo(uuid: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batches')
    .select(`
      id,
      product:product_id (
        id,
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
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batches')
    .select(`
      id,
      region:region_id (
        id,
        title,
        title_arabic,
        description,
        description_arabic,
        map_image_url,
        region_image_url,
        region_image_url_2,
        region_image_url_3
      )
    `)
    .eq('id', batchId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching region info:', error);
    return null;
  }

  return data as RegionData;
}

export async function getBatchInfo(uuid: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const batchId = await getBatchIdFromUUID(uuid);
  if (!batchId) return null;

  const { data, error } = await supabase
    .from('batches')
    .select(`
      id,
      mgo_rating,
      umf_rating,
      test_date,
      notes,
      notes_arabic,
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
  return data as BatchData;
}

// Fetch all ingredients associated with a given product via the product_ingredients join table
export async function getIngredientsInfo(uuid: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
  
  const productId = await getProductInfo(uuid);

  // Adjust the select fields as needed for your schema
  const { data, error } = await supabase
    .from('product_ingredients')
    .select(`
      ingredient:ingredient_id (
        id,
        title,
        title_arabic,
        region_name,
        story,
        story_arabic,
        benefits,
        benefits_arabic,
        specs,
        specs_arabic,
        ingredient_image_url,
        region_image_url
      )
    `)
    .eq('product_id', productId?.product?.id);

  if (error) {
    console.error('Error fetching ingredients info:', error);
    return null;
  }

  return data as unknown as IngredientData;
}

export async function saveScanError(uuid: string) {
  const cookieStore = await cookies();
  const supabaseAdmin = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
  
  const { error } = await supabaseAdmin.from('scan_errors').insert({ uuid: uuid });
  if (error) {
    console.error('Error saving scan error:', error);
  }
}