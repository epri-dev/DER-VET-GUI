<template>
  <div class="container body-content">

    <h3>Open EI</h3>
    <hr/>

    <div class="form-horizontal form-buffer">
      <search-filters @searchClicked="onClickSearch" />
    </div>
    <hr/>

    <!-- Center spinner -->
    <div v-if="this.fetchingTariffs"
         class="spinner-border text-center"
         role="status">
      <span class="sr-only text-center"/>
    </div>

    <div v-if="tariffs.length > 0" class="row">
      <div class="col-md-12 text-center center">
        <input v-model="searchText" class="form-control valid"/>
      </div>
    </div>
    <br/>
    <tariffs-table v-if="tariffs.length > 0" v-model="selectedTariff" :tariffs="filteredTariffs" />

    <div v-if="errorMessage !== null" class="row">
      <div class="col-md-12 error-text-color text-center">
        {{ errorMessage }}
      </div>
    </div>

    <cancel-and-save-buttons
      :backLink="FINANCIAL_INPUTS_RETAIL_TARIFF"
      :disabled="noTariffSelected()"
      :continueLink="this.$route.path"
      continueText="Add Tariff"
      :save="addTariffToProject"
    />

  </div>
</template>

<script lang="ts">
  import Fuse from 'fuse.js';
  import filter from 'lodash/filter';
  import map from 'lodash/map';

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
    errorMessage?: string;
    fetchingTariffs: boolean;
    searchText: string;
    sector?: Sector;
    selectedTariff?: UtilityRate;
    tariffs: UtilityRate[];
    utility?: string;
  }

  export default {
    mixins: [wizardFormMixin],
    components: {
      SearchFilters,
      TariffsTable,
    },
    computed: {
      apiKey() {
        return this.$store.state.OpenEI.apiKey;
      },
      fuse() {
        return new Fuse(this.tariffs, { keys: ['name'] });
      },
      filteredTariffs() {
        return this.searchText ? map(this.fuse.search(this.searchText), 'item') : this.tariffs;
      },
    },
    data: (): Data => ({
      FINANCIAL_INPUTS_RETAIL_TARIFF,
      address: null,
      errorMessage: null,
      fetchingTariffs: false,
      searchText: '',
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
          apiKey: this.apiKey,
          tariffId: this.selectedTariff,
        }).then((response) => (
          new Promise((resolve, reject) => {
            try {
              const pds = convertUtilityRateToTariffList(response.data.items[0]);
              resolve(pds);
            } catch (err) {
              reject(err);
            }
          })
        )).then((pds) => {
          this.$store.dispatch('addManyRetailTariffBillingPeriods', pds)
            .then(this.$router.push({ path: FINANCIAL_INPUTS_RETAIL_TARIFF }));
        }).catch((err) => {
          this.errorMessage = `${err}: unable to add tariff to project.`;
        });
      },
      onClickSearch(address: string, sector: Sector, utility: string) {
        this.fetchingTariffs = true;
        this.tariffs = [];
        getUtilityRates({
          apiKey: this.apiKey,
          address,
          sector,
        }).then((response) => {
          this.tariffs = filter(response.data.items, i => i.utility === utility);
          this.errorMessage = null;
        }).catch((err) => {
          if (err.message === 'Request failed with status code 403') {
            this.errorMessage = 'Unable to fetch tariffs: please check that you have an internet connection and valid API key';
          } else {
            this.errorMessage = `${err}: unable to fetch tariffs.`;
          }
        }).finally(() => {
          this.fetchingTariffs = false;
        });
      },
    },
  };
</script>
