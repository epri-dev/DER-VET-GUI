<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 text-center" v-if="runInProgress">
        <img src="../../assets/copper-loader.gif" />
        <br />
        <label>Running analysis for <b>{{projectName}}</b>. Please be patient as this can take several minutes to complete.</label>
      </div>
      <div class="col-md-12" v-else-if="resultsExist">
        <div>{{ `Pro forma: ${results.proForma.data}` }}</div>
      </div>
      <div class="col-md-12 text-center" v-else-if="errorsExist">
        <br/>
        <div>An error occured: {{errorMessage}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'runAnalysis',
    computed: {
      errorsExist() {
        return this.$store.state.ProjectResult.errorMessage !== null;
      },
      errorMessage() {
        return this.$store.state.ProjectResult.errorMessage;
      },
      results() {
        return this.$store.state.ProjectResult.data;
      },
      resultsExist() {
        return this.$store.state.ProjectResult.data !== null;
      },
      runInProgress() {
        return this.$store.state.ProjectResult.runInProgress;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
    },
  };
</script>
