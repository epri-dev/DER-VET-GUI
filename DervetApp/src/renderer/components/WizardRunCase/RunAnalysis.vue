<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 text-center" v-if="runInProgress">
        <img src="../../assets/copper-loader.gif" />
        <br />
        <label>Running analysis for <b>{{projectName}}</b>. Please be patient as this can take several minutes to complete.</label>
      </div>
      <div class="col-md-12 text-center" v-else-if="isError">
        <br />
        <div>An error occured while running DER-VET</div>
      </div>
      <div class="col-md-12 text-center" v-else-if="resultsExist">
        <br/>
        <h1>Redirecting...</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import path from 'path';

  import { LOG_FILE } from '@/models/dto/ProjectDto';
  import { RESULTS_PATH } from '@/router/constants';

  export default {
    name: 'runAnalysis',
    computed: {
      isError() {
        return this.$store.state.Application.isError === true;
      },
      results() {
        return this.$store.state.Results.data;
      },
      logPath() {
        // TODO Optionally show where log file is if user selected an output folder?
        return path.join(this.$store.state.Project.outputDirectory, LOG_FILE);
      },
      resultsExist() {
        if (this.results !== null) {
          this.$router.push({ path: RESULTS_PATH }).catch(() => {});
        }
        return this.results !== null;
      },
      runInProgress() {
        return this.$store.state.Application.runInProgress;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
    },
  };
</script>
