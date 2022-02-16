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

    <nav-buttons
      left-text="Back"
      right-text="Add Tariff"
      :on-left-click="navToRetailTariffPage"
      :on-right-click="addTariffToProject"
      :disabled="noTariffSelected()"
    />
  </div>
</template>

<script lang="ts">
  import Fuse from 'fuse.js';
  import filter from 'lodash/filter';
  import isEmpty from 'lodash/isEmpty';
  import map from 'lodash/map';

  import SearchFilters from '@/components/Wizard/Components/Financial/RetailTariff/OpenEI/SearchFilters';
  import TariffsTable from '@/components/Wizard/Components/Financial/RetailTariff/OpenEI/TariffsTable';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import CollectionTypes from '@/models/Project/CollectionTypes';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF } from '@/router/constants';
  import { getUtilityRates } from '@/service/OpenEI/request';
  import { Sector, UtilityRate } from '@/service/OpenEI/response';
  import { convertUtilityRateToTariffList } from '@/service/OpenEI/dto';
  import * as a from '@/store/actionTypes';

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
      navToRetailTariffPage() {
        this.$router.push({ path: FINANCIAL_INPUTS_RETAIL_TARIFF });
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
          // TODO Should validate billing periods at some point
          const payload = { collectionType: CollectionTypes.RetailTariff, valuesList: pds };
          this.$store.dispatch(a.ADD_MANY_COLLECTION_ITEMS, payload)
            .then(this.navToRetailTariffPage);
        }).catch((err) => {
          this.errorMessage = `${err}`;
        });
      },
      isConnectionError(msg: string) {
        return msg === 'Request failed with status code 403' || msg === 'Network Error';
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
          if (isEmpty(this.tariffs)) {
            this.errorMessage = '0 tariffs matching search criteria.';
          } else {
            this.errorMessage = null;
          }
        }).catch((err) => {
          if (this.isConnectionError(err.message)) {
            this.errorMessage = 'Unable to fetch tariffs. Please check that you have an internet connection and valid API key.';
          } else {
            this.errorMessage = `${err.message}. Unable to fetch tariffs.`;
          }
        }).finally(() => {
          this.fetchingTariffs = false;
        });
      },
    },
  };
</script>
