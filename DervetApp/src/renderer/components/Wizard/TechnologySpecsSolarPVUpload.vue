<template>
  <div>
    <h3>Technology Specs: Solar PV Generation Profile Upload</h3>
    <hr>
    <form class="form-horizontal form-buffer">
      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="solar generation profile"
        units="kW / rated kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
      />
      <div v-if="(generationProfile === null)">
        <hr>
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
      </div>
      <br>
      <hr>

      <nav-buttons
        :back-link="`/wizard/technology-specs-solar-pv/${this.solarId}`"
        continue-link="/wizard/technology-specs"
        :save="this.save"
      />

    </form>
  </div>
</template>

<script>
  import '@/assets/samples/SamplePVgen-8760.csv';
  import '@/assets/samples/SamplePVgen-8784.csv';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import PVGenerationTimeSeries from '@/models/TimeSeries/PVGenerationTimeSeries';
  import TechnologySpecsSolarPV from '@/models/TechnologySpecs/TechnologySpecsSolarPV';
  import NavButtons from '@/components/Shared/NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    props: ['solarId'],
    data() {
      if (this.generationProfileExists()) {
        return { generationProfile: this.getGenerationProfile() };
      }
      const vals = TechnologySpecsSolarPV.getHardcodedDefaults();
      return { generationProfile: vals.generationProfile };
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.generationProfile;
        }
        return new PVGenerationTimeSeries(this.inputTimeseries);
      },
    },
    methods: {
      generationProfileExists() {
        const solarPVSpecs = this.$store.getters.getSolarPVById(this.solarId);
        return solarPVSpecs && solarPVSpecs.generationProfile !== null;
      },
      getGenerationProfile() {
        const solarPVSpecs = this.$store.getters.getSolarPVById(this.solarId);
        return solarPVSpecs.generationProfile;
      },
      save() {
        if (this.inputTimeseries !== null) {
          const payload = this.makeSavePayload();
          this.$store.dispatch('addGenerationProfileToTechnologySpecsPV', payload);
        }
        const activePayload = this.makeSaveActivePayload();
        this.$store.dispatch('activateTech', activePayload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      makeSaveActivePayload() {
        return {
          id: this.solarId,
          tag: 'PV',
        };
      },
      makeSavePayload() {
        return {
          solarId: this.solarId,
          generationProfile: this.tsData,
        };
      },
    },
  };
</script>
