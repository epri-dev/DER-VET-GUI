<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">
        <timeseries-data-upload
          data-name="solar generation profile"
          units="kW"
          @uploaded="receiveTimeseriesData"
        />

        <br>
        <div class="form-group row">
          <div class="col-md-12">
            <i>
              <a href="files/SamplePVgen-8760.csv" download class="important-link">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep for a year with 365 days (8,760 readings)
            </i>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <i>
              <a href="files/SamplePVgen-8784.csv" download class="important-link">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep <b>for a leap year with 366 days</b> (8,784 readings)
            </i>
          </div>
        </div>
        <br>
        <hr>

        <nav-buttons
          :back-link="`/wizard/technology-specs-solar-pv/${this.solarId}`"
          continue-link="/wizard/technology-specs"
          :save="this.save"
        />

      </div>
    </form>
  </div>
</template>

<script>
  import '../../assets/samples/SamplePVgen-8760.csv';
  import '../../assets/samples/SamplePVgen-8784.csv';
  import { sharedDefaults } from '../../models/Shared.js';
  import PVGenerationTimeSeries from '../../models/PVGenerationTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    props: ['solarId'],
    data() {
      const p = this.$store.state.Project;
      return {
        inputTimestep: sharedDefaults.generationProfileTimestep,
        dataYear: p.dataYear,
      };
    },
    methods: {
      save() {
        const payload = this.makeSavePayload();
        this.$store.dispatch('addGenerationProfileToTechnologySpecsPV', payload);
      },
      makeSavePayload() {
        const ts = new PVGenerationTimeSeries(this.inputTimestep, this.inputTimeseries);
        return {
          solarId: this.solarId,
          generationProfile: ts,
        };
      },
    },
  };
</script>
