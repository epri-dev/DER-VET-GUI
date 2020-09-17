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
          <p class="tool-tip">How much energy capability (kWh) should the DERs reserve for each kW of participation in Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.</p>
        </div>
      </div>
      <timeseries-data-upload
        data-name="spinning reserve price"
        units="$/kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="srPrice !== null"
      />
      <hr />
      <nav-buttons
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import PriceTimeSeries from '@/models/PriceTimeSeries';
  import { sharedValidation } from '@/models/Shared';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import NavButtons from '@/components/Shared/NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        inputSRGrowth: p.srGrowth,
        inputDuration: p.srDuration,
        srPrice: p.srPrice,
      };
    },
    methods: {
      save() {
        const price = new PriceTimeSeries('SR', this.inputTimeseries);
        this.$store.dispatch('setSRPrice', price);

        this.$store.dispatch('setSRGrowth', this.inputSRGrowth);
        this.$store.dispatch('setSRDuration', this.inputDuration);
      },
    },
  };
</script>
