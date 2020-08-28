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
        data-name="maximum power"
        units="kW"
        @uploaded="receiveTimeseriesDataPowerMax"
        :data-exists="userPowerMax !== null"
      />
      
      <timeseries-data-upload
        data-name="minimum power"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="userPowerMin !== null"
      />
            
      <timeseries-data-upload
        data-name="maximum energy"
        units="kWh"
        @uploaded="receiveTimeseriesDataDownEnergyMax"
        :data-exists="userEnergyMax !== null"
      />

      <timeseries-data-upload
        data-name="minimum energy"
        units="kWh"
        @uploaded="receiveTimeseriesDataDownEnergyMin"
        :data-exists="userEnergyMin !== null"
      />
      <hr />
     <!-- TODO continue link should be dependent on selections in Services component -->
      <nav-buttons
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import { sharedValidation } from '../../models/Shared.js';
  import PriceTimeSeries from '../../models/PriceTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  export default {
    components: { NavButtons, TimeseriesDataUpload },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        sharedValidation,
        inputPrice: p.userPrice,
        userPowerMin: p.userPowerMin,
        userPowerMax: p.userPowerMax,
        userEnergyMin: p.userEnergyMin,
        userEnergyMax: p.userEnergyMax,
        inputPowerMax: null,
        inputEnergyMin: null,
        inputEnergyMax: null,
      };
    },
    methods: {
      save() {
        if (this.inputEnergyMin !== null) {
          const energyMin = new PriceTimeSeries('Energy Min', this.inputEnergyMin);
          this.$store.dispatch('setUserEnergyMin', energyMin);
        }
        if (this.inputEnergyMax !== null) {
          const energyMax = new PriceTimeSeries('Energy Max', this.inputEnergyMax);
          this.$store.dispatch('setUserEnergyMax', energyMax);
        }
        if (this.inputTimeseries !== null) {
          const powerMin = new PriceTimeSeries('Power Min', this.inputTimeseries);
          this.$store.dispatch('setUserPowerMin', powerMin);
        }
        if (this.inputPowerMax !== null) {
          const powerMax = new PriceTimeSeries('Power Max', this.inputPowerMax);
          this.$store.dispatch('setUserPowerMax', powerMax);
        }
        this.$store.dispatch('setUserPrice', this.inputPrice);
      },
      receiveTimeseriesDataPowerMax(timeseries) {
        this.inputPowerMax = timeseries;
      },
      receiveTimeseriesDataDownEnergyMin(timeseries) {
        this.inputEnergyMin = timeseries;
      },
      receiveTimeseriesDataDownEnergyMax(timeseries) {
        this.inputEnergyMax = timeseries;
      },
    },
  };
</script>
