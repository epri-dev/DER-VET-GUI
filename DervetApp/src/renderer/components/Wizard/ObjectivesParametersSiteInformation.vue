<template>
  <div>
    <h3>Services: Site Information</h3>
    <hr>
    <form class="form-horizontal form-buffer">
      <div class="form-group row">
        <div class="col-md-12 checkboxes">
          <input 
            id="no-charging-from-grid"
            type="checkbox"
            v-model="inputNoChargingFromGrid">
          <label for="no-charging-from-grid">Prevent power import from the grid (self-generation only)</label>
          <p class="tool-tip tooltip-col tt-col-0">
            Will the project be required to island and ride through an outage of a specified duration?
          </p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-12 checkboxes">
          <input
            id="no-discharging-to-grid"
            type="checkbox"
            v-model="inputNoDischargingToGrid">
          <label for="no-discharging-to-grid">Prevent power export to the grid (self-consumption only)</label>
          <p class="tool-tip tooltip-col tt-col-0">
            Will the project be required to island and ride through an outage of a specified duration?
          </p>
        </div>
      </div>
      <hr>
      <br>
      <!-- TODO whether upload section shows is dependent on selections in Services component -->
      <div class="form-group row">
        <div class="col-md-12">
          Upload the site load as a .csv file that contains a reading at each time interval on a separate line.
          The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep
          of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
        </div>
      </div>
      <br>
      <div class="form-group row">
        <div class="col-md-12">
          <i>
          <a href="files/SampleSiteLoad-8760.csv" download class="important-link">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep for a year with 365 days (8,760 readings)
          </i>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-12">
          <i>
          <a href="files/SampleSiteLoad-8784.csv" download class="important-link">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep <b>for a leap year with 366 days</b> (8,784 readings)
          </i>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <div class="col-md-5">
          <label class="control-label" for="data-file">
            Site load for the year {{dataYear}}
            <span class="unit-label">(kW)</span>
          </label>
        </div>
        <div class="col-md-7">
          <input 
            type="file"
            id="data-file"
            class="form-control"
            @change="onFileUpload">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-5">
          <label class="control-label">Timestep</label>
        </div>
        <div class="col-md-7">
          <select
            class="form-control numberbox"
            id="timestep"
            v-model="timestep">
            <option
              v-for="value in sharedValidation.generationProfileTimestep.allowedValues"
              v-bind:value="value" :disabled="true">
              {{value}}
            </option>
          </select>
          <span class="unit-label">minutes</span>
        </div>
      </div>
      <hr>

      <!-- TODO continue link should be dependent on selections in Services component -->
      <nav-buttons
        back-link="/wizard/objectives"
        continue-link="/wizard/objectives-parameters-da"
        :save="this.save"
      />

    </form>
  </div>
</template>

<script>
  import '../../assets/samples/SampleSiteLoad-8760.csv';
  import '../../assets/samples/SampleSiteLoad-8784.csv';
  import { sharedValidation } from '../../models/Shared.js';
  import SiteLoadTimeSeries from '../../models/SiteLoadTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        inputNoChargingFromGrid: p.noChargingFromGrid,
        inputNoDischargingToGrid: p.noDischargingToGrid,
        timestep: p.timestep,
        dataYear: p.dataYear,
      };
    },
    methods: {
      save() {
        const siteLoad = new SiteLoadTimeSeries(this.timestep, this.inputTimeseries);
        this.$store.dispatch('setSiteLoad', siteLoad);
        this.$store.dispatch('setNoChargingFromGrid', this.inputNoChargingFromGrid);
        this.$store.dispatch('setNoDischargingToGrid', this.inputNoDischargingToGrid);
      },
    },
  };
</script>
