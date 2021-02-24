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
      return {
        sharedValidation,
        useExisting: sharedDefaults.useExistingTimeSeriesData,
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
      timeseriesXAxis() {
        // the first timestamp should be Jan 1 of dataYear at timestep minutes
        //   to represent the period-ending value.
        return this.$store.getters.getTimeseriesXAxis;
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
