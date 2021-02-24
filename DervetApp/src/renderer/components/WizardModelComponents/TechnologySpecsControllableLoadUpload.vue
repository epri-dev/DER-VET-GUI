<template>
  <div>
    <form class="form-horizontal form-buffer">
      <h3>Technology Specs: Controllable Load Profile Upload</h3>
      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        :data-name="loadName"
        units='kW'
        @uploaded="receiveTimeseriesData"
        :data-time-series="loadProfile"
        key="1"
        :TimeSeriesModel="SiteLoadTimeSeries"
      />

      <hr>

      <save-buttons
        :continue-link="WIZARD_COMPONENT_PATH"
        :save="this.save"
      />

    </form>
  </div>
</template>

<script>
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import SiteLoadTimeSeries from '@/models/TimeSeries/SiteLoadTimeSeries';
  import SaveButtons from '@/components/Shared/SaveButtons';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import {
    ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD,
    ACTIVATE_TECH,
    MAKE_LIST_OF_ACTIVE_TECHNOLOGIES,
  } from '@/store/actionTypes';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  export default {
    components: { SaveButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    props: ['id'],
    data() {
      return {
        loadProfile: this.getloadProfile(),
        loadName: 'maximum load profile',
        WIZARD_COMPONENT_PATH,
        SiteLoadTimeSeries,
      };
    },
    methods: {
      getloadProfile() {
        const controllableLoadItem = this.$store.getters.getControllableLoadById(this.id);
        return controllableLoadItem.load;
      },
      save() {
        if (this.inputTimeseries[this.loadName] !== undefined) {
          const payload = this.makeSavePayload();
          this.$store.dispatch(ADD_LOAD_PROFILE_TO_TECHNOLOGY_SPECS_CONTROLLABLE_LOAD, payload);
        }
        const activePayload = this.makeSaveActivePayload();
        this.$store.dispatch(ACTIVATE_TECH, activePayload);
        this.$store.dispatch(MAKE_LIST_OF_ACTIVE_TECHNOLOGIES, this.$store.state.Project);
      },
      makeSaveActivePayload() {
        return {
          id: this.id,
          tag: 'ControllableLoad',
        };
      },
      makeSavePayload() {
        return {
          id: this.id,
          loadProfile: this.inputTimeseries[this.loadName],
        };
      },
    },
  };
</script>
