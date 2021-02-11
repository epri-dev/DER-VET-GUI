<template>
  <div id="timeseries-data-upload">
    <data-upload
      :chart-name="chartName"
      :data-name="dataName"
      :data-frequency="{ value: this.timestep, unit: 'minutes' }"
      :DataModel="TimeSeriesModel"
      :number-of-entries-required="this.numberOfEntriesRequired"
      @uploaded="onFileUpload"
      :units="units"
      :uploaded-data="dataTimeSeries"
      :x-axis="timeseriesXAxis"
    />
  </div>
</template>

<script>
  import { sharedDefaults, sharedValidation } from '@/models/Shared.js';
  import DataUpload from './DataUpload';

  export default {
    data() {
      const xstart = (new Date(`${this.dataYear}-01-01`)).getTime();
      const xx = [];
      for (let i = 0; i < this.numberOfEntriesRequired; i += 1) {
        xx[i] = new Date(xstart + ((i * 36e5 * 60) / this.timestep));
      }
      return {
        sharedValidation,
        useExisting: sharedDefaults.useExistingTimeSeriesData,
        timeseriesXAxis: xx,
      };
    },
    components: { DataUpload },
    methods: {
      onFileUpload(payload) {
        this.$emit('uploaded', payload);
      },
    },
    computed: {
      dataExists() {
        const data = this.dataTimeSeries;
        if (data === null || data === undefined) {
          return false;
        }
        return data.data !== null || data.data !== undefined;
      },
      firstLetterCapitalized() {
        return this.dataName.charAt(0).toUpperCase() + this.dataName.slice(1);
      },
      dataYear() {
        return this.$store.state.Project.dataYear;
      },
      timestep() {
        return this.$store.state.Project.timestep;
      },
      isLeapYear() {
        const conditionOne = (this.dataYear % 4 === 0);
        const conditionTwo = (this.dataYear % 100 !== 0) || (this.dataYear % 400 === 0);
        return conditionOne && conditionTwo;
      },
      numberOfEntriesRequired() {
        if (this.timestep === null || this.timestep === undefined) {
          return 'TBD';
        }
        if (this.isLeapYear) {
          return String((8784 * 60) / this.timestep);
        }
        return String((8760 * 60) / this.timestep);
      },
    },
    props: {
      chartName: String,
      dataName: String,
      dataTimeSeries: Object,
      TimeSeriesModel: Function,
      units: String,
    },
  };
</script>
