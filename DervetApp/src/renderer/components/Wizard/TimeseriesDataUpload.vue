<template>
  <div id="timseries-data-upload">
    <hr> 
    <div class="form-group row">
      <div class="col-md-12">
        Upload the deferral load as a <code>.csv</code> file that contains a reading at each time interval on a separate line.
        The number of total lines expected depends on the selected year and timestep. 
        Data Year: 2020
        Timestep: 60
        For instance, an upload with a timestep
        of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
      </div>
    </div> 
    <hr> 
  </div>
  <!-- <div class="form-group form-buffer">
  <hr>
    <div class="col-md-12">
      Upload the deferral load as a <code>.csv</code> file that contains a reading at each time interval on a separate line.
      The number of total lines expected depends on the selected year and timestep. 
    </div>
    <div class="row">
      <div class="col-md-3">
        <p>Data Year: {{this.dataYear}}</p>
        <p>Timestep: {{this.timestep}}</p>
      </div>
      <div class="col-md-9">
        For instance, an upload with a timestep
        of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
      </div>
    </div>
  </div>
  <hr>
  <div class="form-group row">
    <div class="col-md-3">
      <label for="DataFile" class="control-label">
        {{this.dataName}} {{this.timestep}}-minute data for the year {{this.dataYear}}
        <span class="unit-label">{{this.units}}</span>
      </label>
    </div>
    <div class="col-md-9">
      <input
        type="file"
        id="timeseries"
        class="form-control"
        @change="onFileUpload">
    </div>
  </div> -->
</template>

<script>
  // import csvUploadMixin from '../../mixins/csvUploadMixin';
  export default {
    // mixins: [csvUploadMixin],
    props: {
      dataYear: Number,
      timeStep: Number,
      dataName: String,
      units: String,
    },
  };
</script>
