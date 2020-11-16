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
      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="deferral load"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
      />
      <hr>
      <nav-buttons
        :back-link="WIZARD_COMPONENT_PATH"
        :continue-link="WIZARD_COMPONENT_PATH"
        :save="this.save"
      />
    </form>
  </div>
</template>

<script>
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import DeferralLoadTimeSeries from '@/models/TimeSeries/DeferralLoadTimeSeries';
  import { sharedValidation } from '@/models/Shared';
  import NavButtons from '@/components/Shared/NavButtons';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from './TimeseriesDataUpload';


  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        deferralLoad: p.deferralLoad,
        inputDeferralPlannedLoadLimit: p.deferralPlannedLoadLimit,
        inputDeferralReversePowerFlowLimit: p.deferralReversePowerFlowLimit,
        inputDeferralGrowth: p.deferralGrowth,
        inputDeferralPrice: p.deferralPrice,
        WIZARD_COMPONENT_PATH,
      };
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.deferralLoad;
        }
        return new DeferralLoadTimeSeries(this.inputTimeseries);
      },
    },
    methods: {
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setDeferralLoad', this.tsData);
        }
        this.$store.dispatch('setDeferralPlannedLoadLimit', this.inputDeferralPlannedLoadLimit);
        this.$store.dispatch('setDeferralReversePowerFlowLimit', this.inputDeferralReversePowerFlowLimit);
        this.$store.dispatch('setDeferralGrowth', this.inputDeferralGrowth);
        this.$store.dispatch('setDeferralPrice', this.inputDeferralPrice);
      },
    },
  };
</script>
