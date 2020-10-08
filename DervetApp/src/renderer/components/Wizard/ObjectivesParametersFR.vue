<template>
  <div>
    <h3>Services: Frequency Regulation</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Energy Option Up</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputEOU">
          <span class="unit-label">kWh/kW-hr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Energy content of the AGC signal in the up direction</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Energy Option Down</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputEOD">
          <span class="unit-label">kWh/kW-hr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Energy content of the AGC signal in the down direction</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Growth Rate of Frequency Regulation Price</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputGrowth">
          <span class="unit-label">%/yr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Yearly growth rate to apply to regulation prices</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Growth Rate of Frequency Regulation Energy Price</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputEnergyPriceGrowth">
          <span class="unit-label">%/yr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Yearly growth rate to apply to the value of energy</p>
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
          <p class="tool-tip">How much energy capability (kWh) should the DERs reserve for each kW of participation in Frequency Regulation? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Is there a requirement to bid as much regulation up as regulation down?</label>
        </div>
        <div class="col-md-3">
          <b-form-group>
            <b-form-radio-group
              v-model="inputCombinedMarket"
              :options="sharedValidation.optionsYN.allowedValues"
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Is this a combined regulation market? If it is combined, regulation up will be provided in the same quantity as regulation down always.</p>
        </div>
      </div>
    </div>
    <div class="form-horizontal form-buffer">

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="frequency regulation price"
        units="$/kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
        v-if="inputCombinedMarket"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries2"
        data-name="frequency regulation up price"
        units="$/kW"
        @uploaded="receiveTimeseriesData2"
        :data-exists="(tsData2 !== null)"
        :data-time-series="tsData2"
        :key="childKey2"
        v-if="!(inputCombinedMarket)"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries3"
        data-name="frequency regulation down price"
        units="$/kW"
        @uploaded="receiveTimeseriesData3"
        :data-exists="(tsData3 !== null)"
        :data-time-series="tsData3"
        :key="childKey3"
        v-if="!(inputCombinedMarket)"
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
  import FRPriceTimeSeries from '@/models/FRPriceTimeSeries';
  import FRUpPriceTimeSeries from '@/models/FRUpPriceTimeSeries';
  import FRDownPriceTimeSeries from '@/models/FRDownPriceTimeSeries';
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
        inputEOU: p.frEOU,
        inputEOD: p.frEOD,
        inputGrowth: p.frGrowth,
        inputEnergyPriceGrowth: p.frEnergyPriceGrowth,
        inputCombinedMarket: p.frCombinedMarket,
        inputDuration: p.frDuration,
        frPrice: p.frPrice,
        frUpPrice: p.frUpPrice,
        frDownPrice: p.frDownPrice,
      };
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.frPrice;
        }
        return new FRPriceTimeSeries(this.inputTimeseries);
      },
      tsData2() {
        if (this.inputTimeseries2 === null) {
          return this.frUpPrice;
        }
        return new FRUpPriceTimeSeries(this.inputTimeseries2);
      },
      tsData3() {
        if (this.inputTimeseries3 === null) {
          return this.frDownPrice;
        }
        return new FRDownPriceTimeSeries(this.inputTimeseries3);
      },
    },
    methods: {
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setFRPrice', this.tsData);
        }
        if (this.inputTimeseries2 !== null) {
          this.$store.dispatch('setFRUpPrice', this.tsData2);
        }
        if (this.inputTimeseries3 !== null) {
          this.$store.dispatch('setFRDownPrice', this.tsData3);
        }
        this.$store.dispatch('setFReou', this.inputEOU);
        this.$store.dispatch('setFReod', this.inputEOD);
        this.$store.dispatch('setFRGrowth', this.inputGrowth);
        this.$store.dispatch('setFREnergyGrowth', this.inputEnergyPriceGrowth);
        this.$store.dispatch('setFRCombinedMarket', this.inputCombinedMarket);
        this.$store.dispatch('setFRDuration', this.inputDuration);
      },
    },
  };
</script>
