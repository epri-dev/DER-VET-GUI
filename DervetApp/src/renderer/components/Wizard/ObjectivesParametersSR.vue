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
                :options="sharedValidation.optionsYN.allowedValues"
                name="radio-inline"
              ></b-form-radio-group> 
            </b-form-group>
          </div>
        </div>
        <div id="DataFile-Form" v-if="!(useExisting) || (srPrice === null)">
          <timeseries-data-upload
            data-name="spinning reserve price"
            units="kW"
            @uploaded="receiveTimeseriesData"
          />
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
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        useExisting: sharedDefaults.useExistingTimeSeriesData,
        sharedValidation,
        inputSRGrowth: p.srGrowth,
        inputDuration: p.srDuration,
        srPrice: p.srPrice,
      };
    },
    methods: {
      save() {
        const price = new PriceTimeSeries('SR', this.inputTimeseries);
        this.$store.dispatch('newSRPrice', price);

        this.$store.dispatch('setSRGrowth', this.inputSRGrowth);
        this.$store.dispatch('setSRDuration', this.inputDuration);
      },
    },
  };
</script>
