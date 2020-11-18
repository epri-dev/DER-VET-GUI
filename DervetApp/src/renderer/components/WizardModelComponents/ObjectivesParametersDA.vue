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
        chart-name="chartUploadedTimeSeries"
        data-name="day ahead price"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
      />
      <hr />
      <nav-buttons
        :back-link="WIZARD_COMPONENT_PATH"
        :continue-link="WIZARD_COMPONENT_PATH"
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries';
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
        inputDAGrowth: p.daGrowth,
        daPrice: p.daPrice,
        WIZARD_COMPONENT_PATH,
      };
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.daPrice;
        }
        return new DAPriceTimeSeries(this.inputTimeseries);
      },
    },
    methods: {
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setDAPrice', this.tsData);
        }
        this.$store.dispatch('setDAGrowth', this.inputDAGrowth);
      },
    },
  };
</script>
