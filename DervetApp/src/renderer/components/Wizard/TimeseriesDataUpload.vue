<template>
  <div id="timseries-data-upload">
    <hr />
    <div v-if="this.dataExists" class="form-group">
      <div class="col-md-12">
        <label for="UseExistingData" class="control-label">{{this.firstLetterCapitalized}} data has already been uploaded for this project. Do you want to use the existing data?</label>
      </div>
      <div class="col-md-12">
        <b-form-group>
          <b-form-radio-group
            v-model="useExisting"
            :options="sharedValidation.optionsYN.allowedValues"
          ></b-form-radio-group>
        </b-form-group>
      </div>
    </div>
    <div id="DataFile-Form" v-if="!(useExisting)||!(this.dataExists)">
      <div class="row">
        <div class="col-md-12">
          Upload the <b>{{this.dataName}}</b> as a <code>.csv</code> file that contains a reading at each time interval on a separate line.
          The number of total lines expected depends on the selected year and timestep. For instance, an upload with a timestep of 30-minutes for a year with 365 days would require an input file with 17,520 readings, whereas an upload with a timestep of 60-minutes on a year with 366 days would require an input file with 8,784 readings.
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2 control-label">
          <label>Data Year:</label>
        </div>
        <div class="col-md-3">
          <label>{{this.dataYear}}</label>
        </div>
        <div class="col-md-2 control-label">
          <label>Timestep:</label>
        </div>
        <div class="col-md-5">
          <label>{{this.timestep}}</label>
          <span class="unit-label">minutes</span>
        </div>

      </div>
      <div class="row">
        <div class="col-md-12">
          <p>We require an input file with <b>{{this.numberOfEntriesRequired}}</b> entries.</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-5">
          <label class="control-label capitalize">
            {{this.dataName}} data
          </label>
          <span class="unit-label">({{this.units}})</span>
        </div>
        <div class="col-md-7">
          <input
            type="file"
            class="form-control"
            @change="onFileUpload">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { flatten } from 'lodash';

  import { parseCsvFromFile } from '@/util/file';
  import { sharedDefaults, sharedValidation } from '../../models/Shared.js';

  export default {
    data() {
      return {
        sharedValidation,
        useExisting: sharedDefaults.useExistingTimeSeriesData,
      };
    },
    computed: {
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
        if (this.isLeapYear) {
          return (8784 * 60) / this.timestep;
        }
        return (8760 * 60) / this.timestep;
      },
    },
    props: {
      dataName: String,
      units: String,
      dataExists: Boolean,
    },
    methods: {
      onFileUpload(e) {
        const onSuccess = (results) => { this.$emit('uploaded', flatten(results)); };
        parseCsvFromFile(e, onSuccess);
      },
    },
  };
</script>
