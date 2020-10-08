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
          <p class="tool-tip tt-col-0">
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
          <p class="tool-tip tt-col-0">
            Will the project be required to island and ride through an outage of a specified duration?
          </p>
        </div>
      </div>
      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="site load"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
      />
      <div v-if="(siteLoad === null)">
        <hr>
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
      </div>
      <hr>

      <!-- TODO continue link should be dependent on selections in Services component -->
      <nav-buttons
        :back-link="objectivesPath"
        :save="this.save"
      />

    </form>
  </div>
</template>

<script>
  import '@/assets/samples/SampleSiteLoad-8760.csv';
  import '@/assets/samples/SampleSiteLoad-8784.csv';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import SiteLoadTimeSeries from '@/models/SiteLoadTimeSeries';
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
        inputNoChargingFromGrid: p.noChargingFromGrid,
        inputNoDischargingToGrid: p.noDischargingToGrid,
        siteLoad: p.siteLoad,
        objectivesPath: p.paths.objectives,
      };
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.siteLoad;
        }
        return new SiteLoadTimeSeries(this.inputTimeseries);
      },
    },
    methods: {
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setSiteLoad', this.tsData);
        }
        this.$store.dispatch('setNoChargingFromGrid', this.inputNoChargingFromGrid);
        this.$store.dispatch('setNoDischargingToGrid', this.inputNoDischargingToGrid);
      },
    },
  };
</script>
