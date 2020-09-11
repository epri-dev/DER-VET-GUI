<template>
  <div>
    <h3>Financial Inputs</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="discount-rate">Discount Rate (for discounted cash flow analysis)</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="discount-rate"
              type="text"
              v-model.number="inputDiscountRate">
            <span class="unit-label">%</span>
            <p class="tool-tip tooltip-col">
              What is the discount rate to be used in the financial analysis? (Note: in the future, we will build calculators for this based on loan terms, return on equity, etc.)
            </p>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="inflation-rate">Inflation Rate</label>
          </div>
          <div class="col-md-9">
            <input 
              class="form-control numberbox"
              id="inflation-rate"
              type="text"
              v-model.number="inputInflationRate">
            <span class="unit-label">%</span>
            <p class="tool-tip tooltip-col">
              What is the inflation rate to be used in the financial analysis?
            </p>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="federal-tax-rate">Federal Tax Rate</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="federal-tax-rate"
              type="text"
              v-model.number="inputFederalTaxRate">
            <span class="unit-label">%</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="state-tax-rate">State Tax Rate</label>
          </div>
          <div class="col-md-9">
            <input 
              class="form-control numberbox"
              id="state-tax-rate" 
              type="text"
              v-model.number="inputStateTaxRate">
            <span class="unit-label">%</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="property-tax-rate">Property Tax Rate</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="property-tax-rate"
              type="text"
              v-model.number="inputPropertyTaxRate">
            <span class="unit-label">%</span>
          </div>
        </div>
        <hr>

        <nav-buttons
          :save="this.save"
        />

      </div>
    </form>
  </div>
</template>

<script>
  import NavButtons from '@/components/Shared/NavButtons';

  export default {
    components: { NavButtons },
    data() {
      const p = this.$store.state.Project;
      return {
        inputDiscountRate: p.discountRate,
        inputInflationRate: p.inflationRate,
        inputFederalTaxRate: p.federalTaxRate,
        inputStateTaxRate: p.stateTaxRate,
        inputPropertyTaxRate: p.propertyTaxRate,
      };
    },
    methods: {
      save() {
        this.$store.dispatch('setDiscountRate', this.inputDiscountRate);
        this.$store.dispatch('setInflationRate', this.inputInflationRate);
        this.$store.dispatch('setFederalTaxRate', this.inputFederalTaxRate);
        this.$store.dispatch('setStateTaxRate', this.inputStateTaxRate);
        this.$store.dispatch('setPropertyTaxRate', this.inputPropertyTaxRate);
      },
    },
  };
</script>
