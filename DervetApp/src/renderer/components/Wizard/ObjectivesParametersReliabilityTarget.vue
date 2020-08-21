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
              :options="optionsYN"
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
        <div class="row">
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
        <div class="row">
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
    <div v-if="criticalLoad !== null" class="form-group">
      <div class="col-md-12">
        <label for="UseExistingData" class="control-label">The critical load has already been uploaded for this project. Do you want to use the existing data?</label>
      </div>
      <div class="col-md-12">
        <b-form-group>
          <b-form-radio-group
            v-model="useExisting"
            :options="optionsYN"
          ></b-form-radio-group> 
        </b-form-group>
      </div>
    </div>
    <div id="DataFile-Form" v-if="!(useExisting)||(criticalLoad === null)">
      <div class="form-group">
        <div class="col-md-12">
          Upload the critical as a .csv file that contains a reading at each time interval on a separate line.
          The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep
          of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
        </div>
      </div>
      <hr />
      <div class="row form-group">
        <div class="col-md-3">
          <label for="DataFile" class="control-label">Critical Load for the year {{dataYear}} <span class="unit-label"> (kW)</span></label>
        </div>
        <div class="col-md-9">
          <input
          type="file"
          id="da-price-timeseries"
          class="form-control"
          @change="onFileUpload">
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label">Timestep</label>
        </div>
        <div class="col-md-3">
          <select
            class="form-control numberbox"
            id="timestep"
            v-model="inputTimestep">
            <option
              v-for="value in sharedValidation.generationProfileTimestep.allowedValues"
              v-bind:value="value">
              {{value}}
            </option>
          </select>
          <span class="unit-label">minutes</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip tooltip-col">What is the timestep that the optimization will use??</p>
        </div>
      </div>
    </div>
    <hr />
    <!-- TODO continue link should be dependent on selections in Services component -->
    <nav-buttons
      back-link="/wizard/objectives-parameters-reliability"
      continue-link="/wizard/objectives-parameters-reliability"
      :save="this.save"
    />
  </div>
</template>

<script>
  import { sharedDefaults, sharedValidation } from '../../models/Shared.js';
  import CriticalLoadTimeSeries from '../../models/CriticalLoadTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    mixins: [csvUploadMixin],
    computed: {
      solarSpecified() {
        return this.pvTechnologies.length > 0;
      },
    },
    data() {
      const p = this.$store.state.Project;
      return {
        useExisting: true,
        sharedValidation,
        criticalLoad: p.criticalLoad,
        reliabilityTarget: p.reliabilityTarget,
        postOptimizationOnly: p.postOptimizationOnly,
        reliabilityNu: p.reliabilityNu,
        reliabilityGamma: p.reliabilityGamma,
        reliabilityMaxOutageDuration: p.reliabilityMaxOutageDuration,
        inputTimestep: sharedDefaults.generationProfileTimestep,
        dataYear: p.dataYear,
        pvTechnologies: p.technologySpecsSolarPV,
        optionsYN: [
          { text: 'Yes', value: true },
          { text: 'No', value: false },
        ],
      };
    },
    methods: {
      save() {
        const criticalLoad = new CriticalLoadTimeSeries(this.inputTimestep, this.inputTimeseries);
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
