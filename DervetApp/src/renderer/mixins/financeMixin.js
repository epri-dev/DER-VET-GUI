import * as paths from '@/router/constants';

const FINANCE_PAGEKEY = 'financial';

// allow for up to 4 sets of TS data on a single page (user-defined services)
const financeMixin = {
  computed: {
    financial() {
      const p = this.$store.state.Project;
      return [
        {
          show: true,
          fullName: 'Miscellaneous Inputs',
          pageName: 'inputs',
          pageKey: FINANCE_PAGEKEY,
          path: paths.FINANCIAL_INPUTS_PATH,
        },
        {
          show: true,
          fullName: 'External Incentives',
          pageName: 'externalIncentives',
          pageKey: FINANCE_PAGEKEY,
          path: paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH,
        },
        {
          show: p.objectivesRetailEnergyChargeReduction || p.objectivesRetailDemandChargeReduction,
          fullName: 'Retail Tariff',
          pageName: 'retailTariff',
          pageKey: FINANCE_PAGEKEY,
          path: paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
        },
      ];
    },
  },
  methods: {
    isComplete(pageKey, page) {
      return !this.$store.state.Application.pageCompleteness.components[pageKey][page];
    },
  },
};

export default financeMixin;
