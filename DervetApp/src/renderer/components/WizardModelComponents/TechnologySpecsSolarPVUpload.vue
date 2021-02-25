<template>
  <div>
    <form class="form-horizontal form-buffer">
      <h3>Technology Specs: Solar PV Generation Profile Upload</h3>
      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="solar generation profile"
        units='(kW<sub>AC</sub> / rated kW)'
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="1"
        :TimeSeriesModel="PVGenerationTimeSeries"
      />
      <div v-if="(generationProfile === null)">
        <hr>
        <div class="form-group row">
          <div class="col-md-12">
            <i>
              <a href="files/SamplePVgen-8760.csv" download class="important-link text-decoration-none">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep for a year with 365 days (8,760 readings)
            </i>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <i>
              <a href="files/SamplePVgen-8784.csv" download class="important-link text-decoration-none">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep <b>for a leap year with 366 days</b> (8,784 readings)
            </i>
          </div>
        </div>
      </div>

      <hr>

      <save-buttons
        :continue-link="WIZARD_COMPONENT_PATH"
        :save="this.save"
      />

    </form>
  </div>
</template>

<script>
  import '@/assets/samples/SamplePVgen-8760.csv';
  import '@/assets/samples/SamplePVgen-8784.csv';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import PVGenerationTimeSeries from '@/models/TimeSeries/PVGenerationTimeSeries';
  import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
  import SaveButtons from '@/components/Shared/SaveButtons';
  import { WIZARD_COMPONENT_PATH, TECH_SPECS_PV_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  export default {
    components: { SaveButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    props: ['solarId'],
    data() {
      if (this.generationProfileExists()) {
        return {
          generationProfile: this.getGenerationProfile(),
          generationProfileName: 'solar generation profile',
          WIZARD_COMPONENT_PATH,
          TECH_SPECS_PV_PATH,
          PVGenerationTimeSeries,
        };
      }
      const defaultValues = TechnologySpecsSolarPVMetadata.getHardcodedMetadata().getDefaultValues();
      return {
        generationProfile: defaultValues.generationProfile,
        generationProfileName: 'solar generation profile',
        WIZARD_COMPONENT_PATH,
        TECH_SPECS_PV_PATH,
        PVGenerationTimeSeries,
      };
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
        if (this.inputTimeseries[this.generationProfileName] !== undefined) {
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
          generationProfile: this.inputTimeseries[this.generationProfileName],
        };
      },
    },
  };
</script>
