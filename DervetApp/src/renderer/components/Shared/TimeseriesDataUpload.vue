<template>
  <div id="timeseries-data-upload">
    <data-upload
      :chart-name="chartName"
      @click="onRemove"
      :data-exists="dataExists"
      :data-name="dataName"
      :data-frequency="{
        value: timestepValue,
        unit: 'minutes',
      }"
      :DataModel="DataModel"
      :data-year="dataYearValue"
      :disable-upload="disableUpload"
      :error-message="errorMessage"
      :is-invalid="isInvalid"
      :number-of-entries-required="this.numberOfEntriesRequired"
      @uploaded="onFileUpload"
      @input="onChange"
      :object-name="objectName"
      :sample-data-year="sampleDataYear"
      :sample-data-leapyear="sampleDataLeapyear"
      :show-sample-data="showSampleData"
      :uploaded-data="dataTimeSeries"
      :x-axis="timeseriesXAxis"
    />
  </div>
</template>

<script>
  import DataUpload from './DataUpload';

  export default {
    components: { DataUpload },
    methods: {
      onChange(payload) {
        this.$emit('input', payload);
      },
      onFileUpload(payload) {
        this.$emit('uploaded', payload);
      },
      onRemove(payload) {
        this.$emit('click', payload);
      },
    },
    computed: {
      dataYear() {
        return this.$store.state.Project.dataYear;
      },
      dataYearValue() {
        if (['', null].includes(this.dataYear)) {
          return 'undefined';
        } if (!Number.isInteger(this.dataYear)) {
          return 'invalid';
        }
        return String(this.dataYear);
      },
      disableUpload() {
        return (this.timeseriesXAxis.length === 0);
      },
      numberOfEntriesRequired() {
        if (this.disableUpload) {
          return 'TBD';
        }
        return String(this.timeseriesXAxis.length);
      },
      timeseriesXAxis() {
        // the first timestamp should be Jan 1 of dataYear at timestep minutes
        //   to represent the period-ending value.
        return this.$store.getters.getTimeseriesXAxis;
      },
      timestep() {
        return this.$store.state.Project.timestep;
      },
      timestepValue() {
        if (['', null].includes(this.timestep)) {
          return 'undefined';
        }
        return this.timestep;
      },
    },
    props: {
      chartName: String,
      dataExists: Boolean,
      DataModel: Function,
      dataName: String,
      dataTimeSeries: Object,
      errorMessage: String,
      isInvalid: Boolean,
      objectName: String,
      sampleDataYear: String,
      sampleDataLeapyear: String,
      showSampleData: Boolean,
    },
  };
</script>
