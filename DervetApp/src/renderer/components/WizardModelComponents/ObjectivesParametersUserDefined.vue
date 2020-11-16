<template>
  <div>
    <h3>Services: User-Defined Settings</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Yearly Cost Avoided for meeting the user-defined constraints</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputPrice">
          <span class="unit-label">$/yr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Yearly Cost Avoided for meeting the user-defined constraints</p>
        </div>
      </div>

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="maximum power"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries2"
        data-name="minimum power"
        units="kW"
        @uploaded="receiveTimeseriesData2"
        :data-exists="(tsData2 !== null)"
        :data-time-series="tsData2"
        :key="childKey2"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries3"
        data-name="maximum energy"
        units="kWh"
        @uploaded="receiveTimeseriesData3"
        :data-exists="(tsData3 !== null)"
        :data-time-series="tsData3"
        :key="childKey3"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries4"
        data-name="minimum energy"
        units="kWh"
        @uploaded="receiveTimeseriesData4"
        :data-exists="(tsData4 !== null)"
        :data-time-series="tsData4"
        :key="childKey4"
      />
      <hr />
      <nav-buttons
        :back-link="WIZARD_COMPONENT_PATH"
        :continue-link="WIZARD_COMPONENT_PATH"
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import { sharedValidation } from '@/models/Shared.js';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import UserPowerMaxTimeSeries from '@/models/TimeSeries/UserPowerMaxTimeSeries';
  import UserPowerMinTimeSeries from '@/models/TimeSeries/UserPowerMinTimeSeries';
  import UserEnergyMaxTimeSeries from '@/models/TimeSeries/UserEnergyMaxTimeSeries';
  import UserEnergyMinTimeSeries from '@/models/TimeSeries/UserEnergyMinTimeSeries';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import NavButtons from '@/components/Shared/NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        inputPrice: p.userPrice,
        userPowerMax: p.userPowerMax,
        userPowerMin: p.userPowerMin,
        userEnergyMax: p.userEnergyMax,
        userEnergyMin: p.userEnergyMin,
        WIZARD_COMPONENT_PATH,
      };
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.userPowerMax;
        }
        return new UserPowerMaxTimeSeries(this.inputTimeseries);
      },
      tsData2() {
        if (this.inputTimeseries2 === null) {
          return this.userPowerMin;
        }
        return new UserPowerMinTimeSeries(this.inputTimeseries2);
      },
      tsData3() {
        if (this.inputTimeseries3 === null) {
          return this.userEnergyMax;
        }
        return new UserEnergyMaxTimeSeries(this.inputTimeseries3);
      },
      tsData4() {
        if (this.inputTimeseries4 === null) {
          return this.userEnergyMin;
        }
        return new UserEnergyMinTimeSeries(this.inputTimeseries4);
      },
    },

    methods: {
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setUserPowerMax', this.tsData);
        }
        if (this.inputTimeseries2 !== null) {
          this.$store.dispatch('setUserPowerMin', this.tsData2);
        }
        if (this.inputTimeseries3 !== null) {
          this.$store.dispatch('setUserEnergyMax', this.tsData3);
        }
        if (this.inputTimeseries4 !== null) {
          this.$store.dispatch('setUserEnergyMin', this.tsData4);
        }
        this.$store.dispatch('setUserPrice', this.inputPrice);
      },
    },
  };
</script>
