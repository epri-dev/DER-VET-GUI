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
      <div id="DataFile-Form" style="">
        <!-- <timesseries-data-upload
          :data-year="dataYear",
          :time-step="timestep",
          data-name='Deferral Load',
          units='kW'
        /> -->
        <hr>
        <div class="form-group row">
          <div class="col-md-12">
            Upload the deferral load as a <code>.csv</code> file that contains a reading at each time interval on a separate line.
            The number of total lines expected depends on the selected year and timestep. 
            Data Year: {{dataYear}}
            Timestep: {{timestep}}
            For instance, an upload with a timestep
            of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
          </div>
        </div>
        <hr>
        <div class="form-group row">
          <div class="col-md-3">
            <label for="DataFile" class="control-label">
              Deferral Load data for the year {{dataYear}}
              <span class="unit-label">(kW)</span>
            </label>
          </div>
          <div class="col-md-9">
            <input
              type="file"
              id="deferral-timeseries"
              class="form-control"
              @change="onFileUpload">
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-4">
            <label class="control-label">Timestep</label>
          </div>
          <div class="col-md-3">
            <select
              class="form-control numberbox"
              id="timestep"
              v-model="timestep">
              <option
                v-for="value in sharedValidation.generationProfileTimestep.allowedValues"
                v-bind:value="value" :disabled="true">
                {{value}}
              </option>
            </select>
            <span class="unit-label">minutes</span>
          </div>
        </div>
      </div>
      <hr>
      <!-- TODO continue link should be dependent on selections in Services component -->
      <nav-buttons
        back-link="/wizard/objectives-parameters-site-information"
        continue-link="/wizard/objectives-parameters-site-information"
        :save="this.save"
      />
    </form>
  </div>
</template>

<script>
  import { sharedValidation } from '../../models/Shared.js';
  import DeferralLoadTimeSeries from '../../models/DeferralLoadTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';


  export default {
    // components: { NavButtons },
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        dataYear: p.dataYear,
        timestep: p.timestep,
        inputDeferralPlannedLoadLimit: p.deferralPlannedLoadLimit,
        inputDeferralReversePowerFlowLimit: p.deferralReversePowerFlowLimit,
        inputDeferralGrowth: p.deferralGrowth,
        inputDeferralPrice: p.deferralPrice,
      };
    },
    methods: {
      save() {
        const deferralLoad = new DeferralLoadTimeSeries(this.inputTimestep, this.inputTimeseries);
        this.$store.dispatch('setDeferralLoad', deferralLoad);
        this.$store.dispatch('setDeferralPlannedLoadLimit', this.inputDeferralPlannedLoadLimit);
        this.$store.dispatch('setDeferralReversePowerFlowLimit', this.inputDeferralReversePowerFlowLimit);
        this.$store.dispatch('setDeferralGrowth', this.inputDeferralGrowth);
        this.$store.dispatch('setDeferralPrice', this.inputDeferralPrice);
      },
    },
  };
</script>
