// Countries where pre-ticking is allowed
const PRE_TICK_ALLOWED_COUNTRIES = [
  'GB', // United Kingdom
  'US', // United States
  'SG', // Singapore
  // Middle East countries
  'AE', // UAE
  'SA', // Saudi Arabia
  'QA', // Qatar
  'BH', // Bahrain
  'KW', // Kuwait
  'OM', // Oman
];

interface IpApiResponse {
  status: string;
  countryCode: string;
}

/**
 * Gets the user's country code from their IP using ip-api.com
 * Free for non-commercial use, no API key required
 */
export async function getCountryFromIP(): Promise<string | null> {
  try {
    const response = await fetch('https://ip-api.com/json/?fields=status,countryCode', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error fetching country from IP:', response.statusText);
      return null;
    }
    const data: IpApiResponse = await response.json();
    
    if (data.status === 'success' && data.countryCode) {
      return data.countryCode;
    }

    return null;
  } catch (error) {
    console.error('Error detecting location:', error);
    return null;
  }
}

/**
 * Determines if consent checkbox should be pre-ticked based on user's location
 */
export async function shouldPreTickConsent(): Promise<boolean> {
  try {
    const countryCode = await getCountryFromIP();
    
    if (!countryCode) {
      return false;
    }

    // If country is in the pre-tick allowed list, return true
    return PRE_TICK_ALLOWED_COUNTRIES.includes(countryCode);
  } catch (error) {
    console.error('Error determining pre-tick consent:', error);
    // Default to false (no pre-tick) if there's an error
    return false;
  }
} 