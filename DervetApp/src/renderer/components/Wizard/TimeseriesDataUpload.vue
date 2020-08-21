<template>
  <hr>
  <div class="form-group row">
    <div class="col-md-12">
      Upload the deferral load as a <code>.csv</code> file that contains a reading at each time interval on a separate line.
      The number of total lines expected depends on the selected year and timestep. 
      Data Year: {{this.dataYear}}
      Timestep: {{this.timestep}}
      For instance, an upload with a timestep
      of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
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
  </div>
</template>

<script>
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  export default {
    components: { NavButtons },
    mixins: [csvUploadMixin],
    props: {
      dataYear: Number,
      timestep: Number,
      dataName: String,
      units: String
    },
  };
</script>
