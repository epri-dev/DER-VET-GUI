import axios from 'axios';

import {
  Sector,
  UtilityCompaniesResponse,
  UtilityRatesResponse,
} from '@/service/OpenEI/response';

const OPENEI_API_URL = 'https://api.openei.org';
const UTILITY_COMPANIES_API_VERSION = 3;
const UTILITY_RATES_API_VERSION = 7;

interface UtilityRateParams {
  apiKey: string;
  address: string;
  sector: Sector;
  utility?: string;
  tariffId?: string;
}

// TODO handle error
export const getUtilityCompanies = (apiKey: string): Promise<UtilityCompaniesResponse> => (
  axios({
    method: 'get',
    url: `${OPENEI_API_URL}/utility_companies`,
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
    params: {
      address: params.address,
      api_key: params.apiKey,
      approved: true,
      detail: params.tariffId === undefined ? 'minimal' : 'full', // TODO enum
      format: 'json',
      ...(params.tariffId !== undefined && { getPage: params.tariffId }),
      ratesforutility: params.utility === undefined ? '' : params.utility,
      sector: params.sector,
      version: UTILITY_RATES_API_VERSION,
    },
  })
);
