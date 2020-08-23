<template>
  <div>
    <h3>Services: Spinning Reserve Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
          <div class="col-md-4">
            <label class="control-label" for="Growth">Growth Rate of Spinning Reserve Prices</label>
          </div>
          <div class="col-md-3">
            <input
              class="form-control numberbox"
              id="growth"
              type="text"
              v-model.number="inputSRGrowth">
            <span class="unit-label">%/year</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip tooltip-col">What is the growth rate of Spinning Reserve Price?</p>
          </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Duration for Energy Reservation Requirments</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputDuration">
          <span class="unit-label">hours</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">How much energy capability (kWh) should the DERs reserve for each kW of participation in Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.</p>
        </div>
      </div>
        <div v-if="srPrice !== null" class="form-group">
          <div class="col-md-12">
            <label for="UseExistingData" class="control-label">Spinning Reserve Price data has already been uploaded for this project. Do you want to use the existing data?</label>
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
        <div id="DataFile-Form" v-if="!(useExisting) || (srPrice === null)">
          <hr />
          <div class="form-group">
            <div class="col-md-12">
              Upload the spinning reserve price as a .csv file that contains a reading at each time interval on a separate line.
              The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep
              of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
            </div>
          </div>
          <hr />
          <div class="row form-group">
            <div class="col-md-3">
              <label for="DataFile" class="control-label">Spinning Reserve Price data for the year {{dataYear}} <span class="unit-label"> ($/kWh)</span></label>
            </div>
            <div class="col-md-9">
              <input
              type="file"
              id="sr-price-timeseries"
              class="form-control"
              @change="onFileUpload">
            </div>
          </div>
        </div>
        <hr />
        <!-- TODO continue link should be dependent on selections in Services component -->
        <nav-buttons
          back-link="/wizard/objectives-parameters-sr"
          continue-link="/wizard/objectives-parameters-sr"
          :save="this.save"
        />
    </div>
  </div>
</template>

<script>
  import { sharedDefaults, sharedValidation } from '../../models/Shared.js';
  import PriceTimeSeries from '../../models/PriceTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        useExisting: true,
        sharedValidation,
        inputSRGrowth: p.srGrowth,
        inputDuration: p.srDuration,
        srPrice: p.srPrice,
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
        const price = new PriceTimeSeries(this.inputTimestep, 'SR', this.inputTimeseries);
        this.$store.dispatch('newSRPrice', price);

        this.$store.dispatch('setSRGrowth', this.inputSRGrowth);
        this.$store.dispatch('setSRDuration', this.inputDuration);
      },
    },
  };
</script>
