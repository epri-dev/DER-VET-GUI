import * as paths from '@/router/constants';
import { isObjectOfLengthZero } from '@/util/logic';

const FINANCE_PAGEKEY = 'financial';

const financeMixin = {
  computed: {
    financial() {
      const p = this.$store.state.Project;
      const pages = [
        {
          show: true,
          fullName: 'Miscellaneous Inputs',
          pageName: 'inputs',
          pageKey: FINANCE_PAGEKEY,
          path: paths.FINANCIAL_INPUTS_MISCELLANEOUS,
        },
        {
          show: true,
          fullName: 'External Incentives',
          pageName: 'externalIncentives',
          pageKey: FINANCE_PAGEKEY,
          path: paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES,
        },
        {
          show: p.objectivesRetailEnergyChargeReduction || p.objectivesRetailDemandChargeReduction,
          fullName: 'Retail Tariff',
          pageName: 'retailTariff',
          pageKey: FINANCE_PAGEKEY,
          path: paths.FINANCIAL_INPUTS_RETAIL_TARIFF,
        },
      ];
      const pagesWithIsComplete = [];
      pages.forEach((page) => {
        const { pageKey, pageName } = page;

        const error = this.$store.state.Application.errorList.components[pageKey][pageName];
        const complete = isObjectOfLengthZero(error);
        page.isComplete = complete;
        page.errorList = error;
        pagesWithIsComplete.push(page);
      });
      return pagesWithIsComplete;
    },
  },
  methods: {
    isComplete(pageKey, page) {
      return !this.$store.state.Application.pageCompleteness.components[pageKey][page];
    },
  },
};

export default financeMixin;
