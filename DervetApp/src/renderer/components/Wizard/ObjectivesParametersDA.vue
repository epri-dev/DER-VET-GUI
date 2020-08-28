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
      <timeseries-data-upload
        data-name="day ahead price"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="daPrice !== null"
      />
      <hr />
      <!-- TODO continue link should be dependent on selections in Services component -->
      <nav-buttons
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import PriceTimeSeries from '@/models/PriceTimeSeries';
  import { sharedValidation } from '@/models/Shared';
  import NavButtons from './NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        daGrowth: p.daGrowth,
        daPrice: p.daPrice,
      };
    },
    methods: {
      save() {
        const price = new PriceTimeSeries('DA', this.inputTimeseries);
        this.$store.dispatch('setDAGrowth', this.daGrowth);
        this.$store.dispatch('setDAPrice', price);
      },
    },
  };
</script>
