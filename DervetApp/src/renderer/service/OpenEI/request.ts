import axios from 'axios';

import {
  Sector,
  UtilityCompaniesResponse,
  UtilityRatesResponse,
} from '@/service/OpenEI/response';

const OPENEI_API_URL = 'https://api.openei.org';
const REQUEST_TIMEOUT_MS = 5000;
const UTILITY_COMPANIES_API_VERSION = 3;
const UTILITY_RATES_API_VERSION = 7;

interface UtilityRateParams {
  apiKey: string;
  address?: string;
  sector?: Sector;
  utility?: string;
  tariffId?: string;
}

// TODO handle error
export const getUtilityCompanies = (apiKey: string): Promise<UtilityCompaniesResponse> => (
  axios({
    method: 'get',
    url: `${OPENEI_API_URL}/utility_companies`,
    timeout: REQUEST_TIMEOUT_MS,
    params: {
      api_key: apiKey,
      format: 'json',
      version: UTILITY_COMPANIES_API_VERSION,
    },
  })
);

// TODO handle error
export const getUtilityRates = (params: UtilityRateParams): Promise<UtilityRatesResponse> => (
  axios({
    method: 'get',
    url: `${OPENEI_API_URL}/utility_rates`,
    timeout: REQUEST_TIMEOUT_MS,
    params: {
      api_key: params.apiKey,
      version: UTILITY_RATES_API_VERSION,
      format: 'json',
      approved: true,
      detail: params.tariffId === undefined ? 'minimal' : 'full', // TODO enum
      ...(params.address !== undefined && { address: params.address }),
      ...(params.sector !== undefined && { sector: params.sector }),
      ...(params.tariffId !== undefined && { getpage: params.tariffId }),
      ...(params.utility !== undefined && { ratesforutility: params.utility }),
    },
  })
);
