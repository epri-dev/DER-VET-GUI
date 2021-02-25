<template>
  <div>
    <h3>Services: System Information</h3>
    <form class="form-horizontal form-buffer">

      <div class="form-group">
        <timeseries-data-upload 
          chart-name="chartUploadedTimeSeries"
          :data-name="systemLoadName"
          units="kW"
          @uploaded="receiveTimeseriesData"
          :data-time-series="systemLoad"
          key="1"
          :TimeSeriesModel="SystemLoadTimeSeries"
          />
        </div>

      <hr>

      <save-buttons :continue-link="WIZARD_COMPONENT_PATH"
                    :displayError="submitted"
                    :save="validatedSave" />

    </form>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import SystemLoadTimeSeries from '@/models/TimeSeries/SystemLoadTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'systemInformation';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        includeSystemLoad: p.includeSystemLoad,
        systemLoad: p.systemLoad,
        systemLoadName: 'system load',
        WIZARD_COMPONENT_PATH,
        SystemLoadTimeSeries,
      };
    },
    computed: {
      errorList() {
        return this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE];
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.errorList !== null && this.errorList !== undefined) {
        this.submitted = true;
        // this.$v.$touch();
      }
    },
    methods: {
      getErrorListPayload() {
        const errors = [];

        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: errors,
        };
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        this.submitted = true;
        // this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        return this.save();
      },
      save() {
        if (this.inputTimeseries[this.systemLoadName] !== undefined) {
          this.$store.dispatch('setSystemLoad', this.inputTimeseries[this.systemLoadName]);
        }
      },
    },
  };
</script>
