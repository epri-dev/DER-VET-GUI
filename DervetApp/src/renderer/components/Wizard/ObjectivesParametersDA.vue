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
      <nav-buttons
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import DAPriceTimeSeries from '@/models/DAPriceTimeSeries';
  import { sharedValidation } from '@/models/Shared';
  import NavButtons from '@/components/Shared/NavButtons';
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
        const price = new DAPriceTimeSeries(this.inputTimeseries);
        this.$store.dispatch('setDAGrowth', this.daGrowth);
        this.$store.dispatch('setDAPrice', price);
      },
    },
  };
</script>
