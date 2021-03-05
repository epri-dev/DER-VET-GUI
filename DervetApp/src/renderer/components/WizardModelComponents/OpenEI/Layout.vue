<template>
  <div class="container body-content">

    <h3>Open EI</h3>
    <hr/>

    <div class="form-horizontal form-butter">

    <!--
    <div class="row">
      <div class="col-md-12">API Token Input</div>
    </div>
    <br/>
    -->

      <search-filters @searchClicked="onClickSearch" />
    </div>

    <hr/>
    <tariffs-table v-if="tariffs.length > 0" v-model="selectedTariff" :tariffs="tariffs" />

    <cancel-and-save-buttons
      :backLink="FINANCIAL_INPUTS_RETAIL_TARIFF"
      :disabled="noTariffSelected()"
      :continueLink="FINANCIAL_INPUTS_RETAIL_TARIFF"
      continueText="Add Tariff"
      :save="addTariffToProject"
    />

  </div>
</template>

<script lang="ts">
  import filter from 'lodash/filter';

  import SearchFilters from '@/components/WizardModelComponents/OpenEI/SearchFilters';
  import TariffsTable from '@/components/WizardModelComponents/OpenEI/TariffsTable';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF } from '@/router/constants';
  import { getUtilityRates } from '@/service/OpenEI/request';
  import { Sector, UtilityRate } from '@/service/OpenEI/response';
  import { convertUtilityRateToTariffList } from '@/service/OpenEI/dto';

  interface Data {
    FINANCIAL_INPUTS_RETAIL_TARIFF: string;
    address?: string;
    sector?: Sector;
    selectedTariff?: UtilityRate;
    tariffs: Array<UtilityRate>;
    utility?: string;
  }

  export default {
    mixins: [wizardFormMixin],
    components: {
      SearchFilters,
      TariffsTable,
    },
    data: (): Data => ({
      FINANCIAL_INPUTS_RETAIL_TARIFF,
      address: null,
      sector: null,
      selectedTariff: null,
      utility: null,
      tariffs: [],
    }),
    methods: {
      noTariffSelected() {
        return this.selectedTariff === null;
      },
      addTariffToProject() {
        getUtilityRates({
          // TODO api key will come from user
          apiKey: 'NDaTseTlWcxclr9jN2c0xxMKgn9aNJ55G0zGhmVb',
          tariffId: this.selectedTariff,
        }).then((response) => {
          // TODO validate that length of items === 1;
          // TODO error handling of conversion function + API request
          const pds = convertUtilityRateToTariffList(response.data.items[0]);
          this.$store.dispatch('addManyRetailTariffBillingPeriods', pds);
        });
      },
      onClickSearch(address: string, sector: Sector, utility: string) {
        getUtilityRates({
          // TODO use API key from user input / local storage
          apiKey: 'NDaTseTlWcxclr9jN2c0xxMKgn9aNJ55G0zGhmVb',
          address,
          sector,
        }).then((response) => {
          this.tariffs = filter(response.data.items, i => i.utility === utility);
        });
      },
    },
  };
</script>
