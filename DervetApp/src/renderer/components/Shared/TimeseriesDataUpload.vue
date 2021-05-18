<template>
  <div id="timeseries-data-upload">
    <data-upload
      :chart-name="chartName"
      @click="onRemove"
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
      :sizing-on="this.sizingOn"
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
      sizingOn() {
        return this.$store.state.Project.sizingEquipment;
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
      DataModel: Function,
      dataName: String,
      dataTimeSeries: Object,
      errorMessage: String,
      isInvalid: Boolean,
      objectName: String,
    },
  };
</script>
