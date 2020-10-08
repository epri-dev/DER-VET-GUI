<template>
  <div>
    <h3>Services: Non-Spinning Reserve Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
          <div class="col-md-4">
            <label class="control-label" for="Growth">Growth Rate of Non-Spinning Reserve Prices</label>
          </div>
          <div class="col-md-3">
            <input
              class="form-control numberbox"
              id="growth"
              type="text"
              v-model.number="inputNSRGrowth">
            <span class="unit-label">%/year</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip tooltip-col">What is the growth rate of Non-Spinning Reserve Price?</p>
          </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Duration for Energy Reservation Requirements</label>
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
          <p class="tool-tip">How much energy capability (kWh) should the DERs reserve for each kW of participation in Non-Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.</p>
        </div>
      </div>
      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="non-spinning reserve price"
        units="$/kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
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
  import NSRPriceTimeSeries from '@/models/NSRPriceTimeSeries';
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
        inputNSRGrowth: p.nsrGrowth,
        inputDuration: p.nsrDuration,
        nsrPrice: p.nsrPrice,
        dataYear: p.dataYear,
      };
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.nsrPrice;
        }
        return new NSRPriceTimeSeries(this.inputTimeseries);
      },
    },
    methods: {
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setNSRPrice', this.tsData);
        }
        this.$store.dispatch('setNSRGrowth', this.inputNSRGrowth);
        this.$store.dispatch('setNSRDuration', this.inputDuration);
      },
    },
  };
</script>
