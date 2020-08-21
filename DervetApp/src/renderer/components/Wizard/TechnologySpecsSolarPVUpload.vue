<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="form-group row">
          <div class="col-md-12">
            Upload the PV solar generation profile as a <code>.csv</code> file that contains the <i>per rated capacity</i> reading at each time interval on a separate line. The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep of 30-minutes for a year with 365 days would require an input file with 17,520 readings, whereas an upload with a timestep of 60-minutes on a year with 366 days would require an input file with 8,784 readings.
          </div>
        </div>
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
        <div class="form-group row">
          <div class="col-md-5">
            <label class="control-label" for="generation-profile-timeseries">
              Generation Profile File for {{dataYear}}
              <span class="unit-label">(kW / rated kW)</span>
            </label>
          </div>
          <div class="col-md-7">
            <input
              type="file"
              id="generation-profile-timeseries"
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
              v-model="inputTimestep">
              <option
                v-for="value in sharedValidation.generationProfileTimestep.allowedValues"
                v-bind:value="value">
                {{value}}
              </option>
            </select>
            <span class="unit-label">minutes</span>
          </div>
        </div>
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
  import { sharedDefaults, sharedValidation } from '../../models/Shared.js';
  import PVGenerationTimeSeries from '../../models/PVGenerationTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    mixins: [csvUploadMixin],
    props: ['solarId'],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
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
