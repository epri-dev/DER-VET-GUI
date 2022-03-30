<template>
  <div>
    <h3>Retail Tariff</h3>
    <div class="row">
      <div class="col-md-12">
        Build a retail tariff definition by entering each billing period one at a time, by importing a tariff from an export file, or by selecting one from OpenEI's utility rate database.
      </div>
    </div>

    <hr>

    <div class="form-horizontal form-buffer">
      <div class="form-group" v-if="billingPeriodsExist">
        <div class="col-md-12">
          <table class="table table-bordered">
            <thead>
              <tr class="table-align-center">
                <th v-for="label in tariffTableHeaders">
                  {{label}}
                </th>
                <th class="table-align-center">
                  <div @click="removeAll" class="fas fa-trash"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-align-center"
                  v-for="pd in billingPeriods"
                  v-bind:class="{ ['incomplete-row']: !isBillingPeriodComplete(pd.id) }">
                <td>{{pd.values.startMonth}}</td>
                <td>{{pd.values.endMonth}}</td>
                <td>{{pd.values.startTime}}</td>
                <td>{{pd.values.endTime}}</td>
                <td>{{pd.values.excludingStartTime}}</td>
                <td>{{pd.values.excludingEndTime}}</td>
                <td>{{pd.values.weekday}}</td>
                <td>{{pd.values.value}}</td>
                <td>{{pd.values.chargeType}}</td>
                <td>{{pd.values.name}}</td>
                <td class="table-ensure-width">
                  <router-link
                    :to="{ name: 'financialInputsRetailTariffBillingPeriod', params: { id: pd.id }}"
                    v-bind:class="{ incomplete: !isBillingPeriodComplete(pd.id) }">
                    Edit
                  </router-link>
                  <span> | </span>
                  <span @click="removeOne(pd.id)" class="fas fa-trash"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-md-12">
        <router-link
          :to="$route.path"
          class="btn btn-secondary"
          v-on:click.native="addNewBillingPeriod">
          Add Billing Period
        </router-link>
        <router-link :to="paths.FINANCIAL_INPUTS_RETAIL_TARIFF_OPEN_EI" class="btn btn-secondary">
          Use OpenEI Tariff
        </router-link>
        <router-link :to="paths.FINANCIAL_INPUTS_RETAIL_TARIFF_IMPORT" class="btn btn-secondary">
          <i class="fas fa-upload"/> Import Tariff
        </router-link>
        <a
          :href="billingPeriodCsv"
          download="RetailTariff.csv"
          class="btn btn-secondary pull-right"
          v-if="billingPeriodsExist">
          <i class="fas fa-download"/> Export Tariff
        </a>
      </div>
      <div class="col-md-6">
      </div>
    </div>

    <hr>

    <nav-buttons
      :show-left="false"
      :on-right-click="() => this.$router.push({ path: paths.WIZARD_COMPONENT })"
      right-text="Done"
      :show-error="billingPeriodsErrorExists"
      :error-text="billingPeriodsError"
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import { mapGetters } from 'vuex';

  import { RETAIL_TARIFF_HEADERS, billingPeriodsToCsv } from '@/models/Project/Metadata/Finances/RetailTariffBillingPeriod';
  import NavButtons from '@/components/Shared/NavButtons';
  import * as paths from '@/router/constants';
  import { getDefaultValues } from '@/service/ProjectPage';
  import * as a from '@/store/actionTypes';
  import { CollectionType } from '@/models/Project/CollectionType';
  import MetadataFactory from '@/models/Project/Metadata/Factory';
  import { formatCsvForHref } from '@/util/file';

  const tariffTableHeaders = [...RETAIL_TARIFF_HEADERS];
  tariffTableHeaders.shift();

  export default {
    components: { NavButtons },
    data() {
      return {
        collectionType: CollectionType.RetailTariff,
        paths,
        tariffTableHeaders,
      };
    },
    computed: {
      ...mapGetters({ isPageComplete: 'Application/isPageComplete' }),
      billingPeriods() {
        return this.$store.state.Project.retailTariffBillingPeriods;
      },
      billingPeriodCsv() {
        const copied = _.cloneDeep(this.billingPeriods);
        const values = _.map(copied, bp => bp.values);
        const csv = billingPeriodsToCsv(values);
        return formatCsvForHref(csv);
      },
      billingPeriodsExist() {
        return this.billingPeriods.length > 0;
      },
      areAllBillingPeriodsComplete() {
        return _.every(this.billingPeriods, (bp) => this.isBillingPeriodComplete(bp.id));
      },
      billingPeriodsErrorExists() {
        return !this.areAllBillingPeriodsComplete || !this.billingPeriodsExist;
      },
      billingPeriodsError() {
        if (!this.billingPeriodsExist) return 'There are no billing periods specified';
        if (!this.areAllBillingPeriodsComplete) return 'Some billing periods contain errors';
        return '';
      },
    },
    methods: {
      addNewBillingPeriod() {
        // TODO do one thing
        const metadata = MetadataFactory.getMetadata(this.collectionType);
        const values = getDefaultValues(metadata);
        this.$store.dispatch(a.ADD_COLLECTION_ITEM, { collectionType: this.collectionType, values })
          .then((id) => this.$router.push({ path: `${paths.FINANCIAL_INPUTS_RETAIL_TARIFF_BILLING_PERIOD}/${id}` }));
      },
      isBillingPeriodComplete(id) {
        return this.isPageComplete(this.collectionType, id);
      },
      removeAll() {
        this.$store.dispatch(a.REMOVE_ALL_COLLECTION_ITEMS, this.collectionType);
      },
      removeOne(id) {
        this.$store.dispatch(a.REMOVE_COLLECTION_ITEM, { collectionType: this.collectionType, id });
      },
    },
  };
</script>
