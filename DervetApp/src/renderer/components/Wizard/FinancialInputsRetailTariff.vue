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
        <div class="col-md-12 table-bordered">
          <table class="table">
            <thead>
              <tr>
                <th>Billing Period</th>
                <th>Start Month</th>
                <th>End Month</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Excluding Start Time</th>
                <th>Excluding End Time</th>
                <th>Weekday</th>
                <th>Value</th>
                <th>Charge</th>
                <th>Name</th>
                <th>
                  <div @click="removeAll" class="fas fa-trash"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pd in billingPeriods">
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
                <td>
                  <router-link to="/wizard/financial-inputs-retail-tariff-billing-period" class="nav">
                    Edit
                  </router-link> | 
                  <div class="fas fa-trash"></div>
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
        <router-link to="/wizard/financial-inputs-retail-tariff-billing-period" class="btn btn-secondary">
          Add Billing Period
        </router-link>
        <router-link to="/wizard/financial-inputs-retail-tariff-import" class="btn btn-secondary">
          <i class="fas fa-upload"/> Import Tariff
        </router-link>
        <div class="btn btn-secondary pull-right" v-if="billingPeriodsExist()">
          <i class="fas fa-download"/> Export Tariff
        </div>
      </div>
      <div class="col-md-6">
      </div>
    </div>

    <hr>

    <nav-buttons
      back-link="/wizard/financial-inputs-external-incentives"
      continue-link="/wizard/financial-inputs-external-incentives"
      :save="this.save"
    />
  </div>
</template>

<script>
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    computed: {
      billingPeriods() {
        return this.$store.state.Project.retailTariffBillingPeriods;
      },
    },
    methods: {
      billingPeriodsExist() {
        return this.billingPeriods.length > 0;
      },
      removeAll() {
        this.$store.dispatch('removeAllRetailTariffBillingPeriods');
      },
      save() {
        return 'placeholder';
      },
    },
  };
</script>
