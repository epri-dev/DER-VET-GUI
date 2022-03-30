<template>
  <div class="row">
    <div class="col-md-12">
      Upload the <b>{{displayName}} {{`(${unit})`}}</b> as a <code>.csv</code> file that contains a reading for each timestep on a separate line. 
      <span v-if="disableUpload">
        Both data year and timestep must be defined in the Project Configuration page before data can be uploaded.
      </span>
      <span v-else>
        {{xAxisInformation}}, so we require an input file with <b>{{numberOfEntriesRequired}}</b> entries.
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      displayName: String,
      isMonthly: Boolean,
      unit: String,
      numberOfEntriesRequired: Number,
    },
    computed: {
      xAxisInformation() {
        return this.isMonthly
          ? ('These data are monthly')
          : (`The selected data year is ${this.dataYear} and selected data frequency is ${this.timestep} minutes`);
      },
      // TODO map getters
      dataYear() {
        return this.$store.state.Project.dataYear;
      },
      disableUpload() {
        return this.numberOfEntriesRequired === 0;
      },
      timestep() {
        return this.$store.state.Project.timestep;
      },
    },
  };
</script>
