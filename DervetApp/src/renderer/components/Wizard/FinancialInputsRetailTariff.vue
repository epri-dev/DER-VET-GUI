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
              <tr class="table-align-center" v-for="pd in billingPeriods">
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
                    :to="{ name: 'financialInputsRetailTariffBillingPeriod', params: { billingPeriodId: pd.id }}">
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
        <router-link to="/wizard/financial-inputs-retail-tariff-billing-period/null" class="btn btn-secondary">
          Add Billing Period
        </router-link>
        <router-link to="/wizard/financial-inputs-retail-tariff-import" class="btn btn-secondary">
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

    <nav-buttons
      :save="this.save"
    />
  </div>
</template>

<script>
  import { RETAIL_TARIFF_HEADERS, billingPeriodsToCsv } from '@/models/RetailTariffBillingPeriod';
  import { formatCsvForHref } from '@/util/file';
  import NavButtons from '@/components/Shared/NavButtons';

  export default {
    components: { NavButtons },
    computed: {
      billingPeriods() {
        return this.$store.state.Project.retailTariffBillingPeriods;
      },
    },
    data() {
      return { RETAIL_TARIFF_HEADERS };
    },
    methods: {
      exportCsv() {
        const csv = billingPeriodsToCsv(this.billingPeriods);
        return formatCsvForHref(csv);
      },
      billingPeriodsExist() {
        return this.billingPeriods.length > 0;
      },
      removeAll() {
        this.$store.dispatch('removeAllRetailTariffBillingPeriods');
      },
      removeOne(id) {
        this.$store.dispatch('removeRetailTariffBillingPeriod', id);
      },
    },
  };
</script>
