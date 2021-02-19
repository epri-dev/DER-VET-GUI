import axios from 'axios';

import {
  Sector,
  UtilityRatesResponse,
} from '@/service/OpenEI/response';

const OPENEI_API_VERSION = 7;
const OPENEI_API_URL = 'https://api.openei.org';

interface UtilityRateParams {
  apiKey: string;
  address: string;
  sector: Sector;
  utility: string;
  tariffId?: string;
}

export const getUtilityRates = (params: UtilityRateParams): Promise<UtilityRatesResponse> => (
  axios({
    method: 'get',
    url: `${OPENEI_API_URL}/utility_rates`,
    params: {
      address: params.address,
      api_key: params.apiKey,
      approved: true,
      detail: params.tariffId === undefined ? 'minimal' : 'full', // TODO enum
      format: 'json',
      ...(params.tariffId !== undefined && { getPage: params.tariffId }),
      ratesforutility: params.utility,
      sector: params.sector,
      version: OPENEI_API_VERSION,
    },
  })
);

// make utility companies response
export const getUtilityCompanies = (apiKey: string) => (
  axios({
    method: 'get',
    url: `${OPENEI_API_URL}/utility_companies`,
    params: {
      api_key: apiKey,
      format: 'json',
      version: OPENEI_API_VERSION,
    },
  })
);
