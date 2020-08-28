<template>
  <div>
    <h3>Services: Reliability Targets</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
        <div class="col-md-6">
          Do not optimize DER size/operation for reliability -- only calculate the reliability benefit of the DERs
        </div>
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group
              v-model="postOptimizationOnly"
              :options="sharedValidation.optionsYN.allowedValues"
            ></b-form-radio-group> 
          </b-form-group>
        </div>
      </div>
      <div v-if="!(postOptimizationOnly)" class="row form-group">
        <div class="col-md-4">
          <label class="control-label">How many hours of gauranteed outage coverage does the project need to supply based on the load</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="reliabilityTarget">
          <span class="unit-label">hours</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip tooltip-col">How many hours of guaranteed outage coverage does the project need to supply based on the load?</p>
        </div>
      </div>
      <div class="form-group" id="PV-Form">
        <div class="row form-group">
          <div class="col-md-4">
            <label class="control-label">Minimum Percentage of PV Generation</label>
          </div>
          <div class="col-md-3">
            <input
              class="form-control numberbox"
              id="nu"
              type="text"
              v-model.number="reliabilityNu">
            <span class="unit-label">%</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip tooltip-col">Minimum percent of PV generation that one can expect within a timestep</p>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-4">
            <label class="control-label">Timestep Percentage of PV Minimum Generation</label>
          </div>
          <div class="col-md-3">
            <input
              class="form-control numberbox"
              id="gamma"
              type="text"
              v-model.number="reliabilityGamma">
            <span class="unit-label">%</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip tooltip-col">Percent of the timestep for which PV can be expected to be at its minimum expected generation</p>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="row form-group">
      <div class="col-md-4">
        <label class="control-label">Maximum Outage Duration to Plot</label>
      </div>
      <div class="col-md-3">
        <input
          class="form-control numberbox"
          id="growth"
          type="text"
          v-model.number="reliabilityMaxOutageDuration">
        <span class="unit-label">hours</span>
      </div>
      <div class="col-md-5">
        <p class="tool-tip tooltip-col">How many hours of guaranteed outage coverage does the project need to supply based on the load?</p>
      </div>
    </div>
    <br>
    <hr />
    <timeseries-data-upload
        data-name="critical load"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="criticalLoad !== null"
      />
    <hr />
    <!-- TODO continue link should be dependent on selections in Services component -->
    <nav-buttons
      :save="this.save"
    />
  </div>
</template>

<script>
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import CriticalLoadTimeSeries from '@/models/CriticalLoadTimeSeries';
  import { sharedValidation } from '@/models/Shared';
  import NavButtons from './NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    computed: {
      solarSpecified() {
        return this.pvTechnologies.length > 0;
      },
    },
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        criticalLoad: p.criticalLoad,
        reliabilityTarget: p.reliabilityTarget,
        postOptimizationOnly: p.postOptimizationOnly,
        reliabilityNu: p.reliabilityNu,
        reliabilityGamma: p.reliabilityGamma,
        reliabilityMaxOutageDuration: p.reliabilityMaxOutageDuration,
        pvTechnologies: p.technologySpecsSolarPV,
      };
    },
    methods: {
      save() {
        const criticalLoad = new CriticalLoadTimeSeries(this.inputTimeseries);
        this.$store.dispatch('setReliabilityPostOptimizationOnly', this.postOptimizationOnly);
        this.$store.dispatch('setReliabilityTarget', this.reliabilityTarget);
        this.$store.dispatch('setReliabilityNu', this.reliabilityNu);
        this.$store.dispatch('setReliabilityGamma', this.reliabilityGamma);
        this.$store.dispatch('setReliabilityMaxOutageDuration', this.reliabilityMaxOutageDuration);
        this.$store.dispatch('setCriticalLoad', criticalLoad);
      },
    },
  };
</script>
