<template>
  <div id="timseries-data-upload">
    <hr>
    <div class="row">
      <div class="col-md-12">
        Upload the deferral load as a <code>.csv</code> file that contains a reading at each time interval on a separate line.
        The number of total lines expected depends on the selected year and timestep. 
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
        <label>{{this.timeStep}}</label>
        <span class="unit-label">minutes</span>
      </div>

    </div>
    <div class="row">
      <div class="col-md-12">
        <p>We require an input file with <b>{{this.numberOfEntriesRequired}}</b> entires.</p>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-md-5">
        <label for="DataFile" class="control-label">
          {{this.dataName}} data
          <span class="unit-label">({{this.units}})</span>
        </label>
      </div>
      <div class="col-md-7">
        <input
          type="file"
          id="timeseries"
          class="form-control"
          @change="onFileUpload">
      </div>
    </div>
  </div>  
</template>

<script>
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  export default {
    mixins: [csvUploadMixin],
    computed: {
      isLeapYear() {
        const conditionOne = (this.dataYear % 4 === 0);
        const conditionTwo = (this.dataYear % 100 !== 0) || (this.dataYear % 400 === 0);
        return conditionOne && conditionTwo;
      },
      numberOfEntriesRequired() {
        if (this.isLeapYear) {
          return (8784 * this.timeStep) / 60;
        }
        return (8760 * this.timeStep) / 60;
      },
    },
    props: {
      dataYear: Number,
      timeStep: Number,
      dataName: String,
      units: String,
    },
  };
</script>
