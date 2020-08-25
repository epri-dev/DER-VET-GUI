<template>
  <div>
    <h3>Services: Deferral</h3>
    <hr>
    <form class="form-horizontal form-buffer">
      <div class="form-group row">
        <div class="col-md-3">
          <label class="control-label" for="planned-load-limit">Planned Load Limit</label>
        </div>
        <div class="col-md-9">
          <input
            class="form-control numberbox"
            id="planned-load-limit"
            type="text"
            v-model.number="inputDeferralPlannedLoadLimit">
          <span class="unit-label">kW</span>
          <p class="tool-tip tooltip-col">Max net import power flow to grid</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-3">
          <label class="control-label" for="reverse-power-flow-limit">Reverse Power Flow Limit</label>
        </div>
        <div class="col-md-9">
          <input
            class="form-control numberbox"
            id="reverse-power-flow-limit"
            type="text"
            v-model.number="inputDeferralReversePowerFlowLimit">
          <span class="unit-label">kW</span>
          <p class="tool-tip tooltip-col">Max net export power flow to grid</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-3">
          <label class="control-label" for="growth">Growth Rate of Deferral Load</label>
        </div>
        <div class="col-md-9">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputDeferralGrowth">
          <span class="unit-label">%/year</span>
          <p class="tool-tip tooltip-col">What is the growth rate of the deferral load?</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-3">
          <label class="control-label" for="price">Yearly Cost Avoided</label>
        </div>
        <div class="col-md-9">
          <input
            class="form-control numberbox"
            id="price"
            type="text"
            v-model.number="inputDeferralPrice">
          <span class="unit-label">$/year</span>
          <p class="tool-tip tooltip-col">Yearly Cost Avoided for deferring a T and D asset upgrade</p>
        </div>
      </div>
      <div v-if="deferralLoad !== null" class="form-group">
        <div class="col-md-12">
          <label for="UseExistingData" class="control-label">The deferral load has already been uploaded for this project. Do you want to use the existing data?</label>
        </div>
        <div class="col-md-12">
          <b-form-group>
            <b-form-radio-group
              v-model="useExisting"
              :options="sharedValidation.optionsYN.allowedValues"
            ></b-form-radio-group> 
          </b-form-group>
        </div>
      </div>
      <div id="DataFile-Form" style="" v-if="!(useExisting)||(deferralLoad === null)">
        <timeseries-data-upload
          data-name="deferral load"
          units="kW"
          @uploaded="receiveTimeseriesData"
        />
      </div>
      <hr>
      <!-- TODO continue link should be dependent on selections in Services component -->
      <nav-buttons
        back-link="/wizard/objectives-parameters-deferral"
        continue-link="/wizard/objectives-parameters-deferral"
        :save="this.save"
      />
    </form>
  </div>
</template>

<script>
  import { sharedDefaults, sharedValidation } from '../../models/Shared.js';
  import DeferralLoadTimeSeries from '../../models/DeferralLoadTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';


  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        useExisting: sharedDefaults.useExistingTimeSeriesData,
        sharedValidation,
        deferralLoad: p.deferralLoad,
        inputDeferralPlannedLoadLimit: p.deferralPlannedLoadLimit,
        inputDeferralReversePowerFlowLimit: p.deferralReversePowerFlowLimit,
        inputDeferralGrowth: p.deferralGrowth,
        inputDeferralPrice: p.deferralPrice,
      };
    },
    methods: {
      save() {
        const deferralLoad = new DeferralLoadTimeSeries(this.inputTimeseries);
        this.$store.dispatch('setDeferralLoad', deferralLoad);
        this.$store.dispatch('setDeferralPlannedLoadLimit', this.inputDeferralPlannedLoadLimit);
        this.$store.dispatch('setDeferralReversePowerFlowLimit', this.inputDeferralReversePowerFlowLimit);
        this.$store.dispatch('setDeferralGrowth', this.inputDeferralGrowth);
        this.$store.dispatch('setDeferralPrice', this.inputDeferralPrice);
      },
    },
  };
</script>
