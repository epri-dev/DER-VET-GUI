<template>
  <div>
    <h3>External Incentives: Add Data for Year</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="year">Year</label>
          </div>
          <div class="col-md-9">
            <select
              class="form-control form-control-width-auto valid"
              id="year"
              v-model.number="inputYear">
              <option v-for="year in validation.year.allowedValues" v-bind:value="year">
                {{year}}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="tax-credit">Tax Credit</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="tax-credit"
              type="text"
              v-model.number="inputTaxCredit">
            <span class="unit-label">nominal $</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="other-incentive">Other Incentive</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="other-incentive"
              type="text"
              v-model.number="inputOtherIncentive">
            <span class="unit-label">nominal $</span>
          </div>
        </div>

        <hr>

        <nav-buttons
          back-link="/wizard/financial-inputs-external-incentives"
          continue-link="/wizard/financial-inputs-external-incentives"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import { ExternalIncentives, validation } from '@/models/ExternalIncentives';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    data() {
      return {
        validation,
        ...this.getDefaultData(),
      };
    },
    methods: {
      getDefaultData() {
        const defaults = ExternalIncentives.getDefaults();
        return {
          inputId: defaults.id,
          inputYear: defaults.year,
          inputTaxCredit: defaults.taxCredit,
          inputOtherIncentive: defaults.otherIncentive,
        };
      },
      save() {
        this.$store.dispatch('addExternalIncentive', this.buildExternalIncentives());
      },
      buildExternalIncentives() {
        return new ExternalIncentives({
          id: this.inputId,
          year: this.inputYear,
          taxCredit: this.inputTaxCredit,
          otherIncentive: this.inputOtherIncentive,
        });
      },
    },
  };
</script>
