<template>
  <div>
    <h3>Services: Day Ahead Energy Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
          <div class="col-md-4">
            <label class="control-label" for="Growth">Growth Rate of Day Ahead Energy Prices</label>
          </div>
          <div class="col-md-3">
            <input
              class="form-control numberbox"
              id="growth"
              type="text"
              v-model.number="inputDAGrowth">
            <span class="unit-label">%/year</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip tooltip-col">What is the growth rate of Day Ahead Energy Price?</p>
          </div>
      </div>
        <div v-if="daPrice !== null" class="form-group">
          <div class="col-md-12">
            <label for="UseExistingData" class="control-label">Day Ahead Energy Price data has already been uploaded for this project. Do you want to use the existing data?</label>
          </div>
          <div class="col-md-12">
            <b-form-group>
              <b-form-radio-group
                v-model="useExisting"
                :options="optionsYN"
                name="radio-inline"
              ></b-form-radio-group> 
            </b-form-group>
          </div>
        </div>
        <div id="DataFile-Form" v-if="!(useExisting)||(daPrice === null)">
          <hr />
          <div class="form-group">
            <div class="col-md-12">
              Upload the day ahead energy price as a .csv file that contains a reading at each time interval on a separate line.
              The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep
              of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
            </div>
          </div>
          <hr />
          <div class="row form-group">
            <div class="col-md-3">
              <label for="DataFile" class="control-label">Day Ahead Energy Price data for the year {{dataYear}} <span class="unit-label"> ($/kWh)</span></label>
            </div>
            <div class="col-md-9">
              <input
              type="file"
              id="da-price-timeseries"
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
                v-model="inputTimestep">
                <option
                  v-for="value in sharedValidation.generationProfileTimestep.allowedValues"
                  v-bind:value="value">
                  {{value}}
                </option>
              </select>
              <span class="unit-label">minutes</span>
            </div>
            <div class="col-md-5">
              <p class="tool-tip tooltip-col">What is the timestep that the optimization will use??</p>
            </div>
          </div>
        </div>
        <hr />
        <!-- TODO continue link should be dependent on selections in Services component -->
        <nav-buttons
          back-link="/wizard/objectives-parameters-site-information"
          continue-link="/wizard/objectives-parameters-site-information"
          :save="this.save"
        />
    </div>
  </div>
</template>

<script>
  import { sharedDefaults, sharedValidation } from '../../models/Shared.js';
  // import PriceTimeSeries from '../../models/PriceTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        daGrowth: p.daGrowth,
        daPrice: p.daPrice,
        inputTimestep: sharedDefaults.generationProfileTimestep,
        dataYear: p.dataYear,
        optionsYN: [
          { text: 'Yes', value: true },
          { text: 'No', value: false },
        ],
      };
    },
    methods: {
      save() {
        // const price = new PriceTimeSeries(this.inputTimestep, this.inputTimeseries);
        // this.$store.dispatch('setSiteLoad', siteLoad);
        // this.$store.dispatch('setNoChargingFromGrid', this.inputNoChargingFromGrid);
        // this.$store.dispatch('setNoDischargingToGrid', this.inputNoDischargingToGrid);
      },
    },
  };
</script>
