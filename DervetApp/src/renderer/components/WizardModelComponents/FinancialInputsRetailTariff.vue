<template>
  <div>
    <h3>Retail Tariff</h3>
    <div class="row">
      <div class="col-md-12">
        Build a retail tariff definition by entering each billing period one at a time, or by importing a tariff from an export file.
      </div>
    </div>

    <hr>

    <div class="form-horizontal form-buffer">
      <div class="form-group" v-if="billingPeriodsExist()">
        <div class="col-md-12">
          <table class="table table-bordered">
            <thead>
              <tr class="table-align-center" >
                <th v-for="label in RETAIL_TARIFF_HEADERS">
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
                  v-bind:class="{ incomplete: !pd.complete }">
                <td>{{pd.id}}</td>
                <td>{{pd.startMonth}}</td>
                <td>{{pd.endMonth}}</td>
                <td>{{pd.startTime}}</td>
                <td>{{pd.endTime}}</td>
                <td>{{pd.excludingStartTime}}</td>
                <td>{{pd.excludingEndTime}}</td>
                <td>{{pd.weekday}}</td>
                <td>{{pd.value}}</td>
                <td>{{pd.chargeType}}</td>
                <td>{{pd.name}}</td>
                <td class="table-ensure-width">
                  <router-link
                    :to="{ name: 'financialInputsRetailTariffBillingPeriod', params: { billingPeriodId: pd.id }}"
                    v-bind:class="{ incomplete: !pd.complete }">
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
      <div class="form-group" v-else>
        <div class="col-md-12 buffer-bottom">
          <i>There are currently no retail tariff billing periods specified...</i>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-md-12">
        <router-link :to="`${FINANCIAL_INPUTS_RETAIL_TARIFF_PATH}-billing-period/null`" class="btn btn-secondary">
          Add Billing Period
        </router-link>
        <router-link :to="`${FINANCIAL_INPUTS_RETAIL_TARIFF_PATH}-import`" class="btn btn-secondary">
          <i class="fas fa-upload"/> Import Tariff
        </router-link>
        <a
          :href="exportCsv()"
          download="RetailTariff.csv"
          class="btn btn-secondary pull-right"
          v-if="billingPeriodsExist()">
          <i class="fas fa-download"/> Export Tariff
        </a>
      </div>
      <div class="col-md-6">
      </div>
    </div>

    <hr>

    <nav-button :continue-link="WIZARD_COMPONENT_PATH"
                :displayError="!complete"
                :error-text="getSingleErrorMsg()"
                continue-text="Done Adding Billing Periods" />

  </div>
</template>

<script>
  import { RETAIL_TARIFF_HEADERS, billingPeriodsToCsv } from '@/models/RetailTariffBillingPeriod';
  import { formatCsvForHref } from '@/util/file';
  import NavButton from '@/components/Shared/NavButton';
  import {
    WIZARD_COMPONENT_PATH,
    FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
  } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'financial';
  const PAGE = 'retailTariff';

  export default {
    mounted() {
      this.setRetailTariffData();
    },
    components: { NavButton },
    computed: {
      billingPeriods() {
        return this.$store.state.Project.retailTariffBillingPeriods;
      },
      complete() {
        return this.billingPeriodsExist() && this.getNumberOfInvalidRows() === 0;
      },
    },
    data() {
      return {
        RETAIL_TARIFF_HEADERS,
        WIZARD_COMPONENT_PATH,
        FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
      };
    },
    methods: {
      exportCsv() {
        const csv = billingPeriodsToCsv(this.billingPeriods);
        return formatCsvForHref(csv);
      },
      billingPeriodsExist() {
        return this.billingPeriods.length > 0;
      },
      getCompletenessPayload() {
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          completeness: this.complete,
        };
      },
      getErrorListPayload() {
        const errors = [];
        if (!this.complete) {
          errors.push(this.getSingleErrorMsg());
        }
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: errors,
        };
      },
      getNumberOfInvalidRows() {
        let invalidRowsCount = 0;
        Object.values(this.billingPeriods).forEach((row) => {
          if (!row.complete) {
            invalidRowsCount += 1;
          }
        });
        return invalidRowsCount;
      },
      getSingleErrorMsg() {
        if (!this.billingPeriodsExist()) {
          return 'There are no billing periods specified.';
        } else if (!this.complete) {
          const pluralizeRow = (this.getNumberOfInvalidRows() === 1) ? '' : 's';
          return `There are errors with ${this.getNumberOfInvalidRows()} row${pluralizeRow} in the table.`;
        }
        return '';
      },
      removeAll() {
        this.$store.dispatch('removeAllRetailTariffBillingPeriods');
        this.setRetailTariffData();
      },
      removeOne(id) {
        this.$store.dispatch('removeRetailTariffBillingPeriod', id);
        this.setRetailTariffData();
      },
      setRetailTariffData() {
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
      },
    },
  };
</script>
