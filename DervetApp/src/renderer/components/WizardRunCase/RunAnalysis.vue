<template>
  <div>
    <div class="form-horizontal form-buffer">
      <div class="col-md-12 text-center" v-if="runInProgress">
        <img src="../../assets/copper-loader.gif" />
        <br />
        <label>Running analysis for <b>{{projectName}}</b>. Please be patient as this can take several minutes to complete.</label>
      </div>
      <div class="col-md-12 text-center" v-else-if="isError">
        <img class="fas fa-exclamation-triangle fa-5x"/>
        <br />
        <div>An error occured while running DER-VET</div>
      </div>
      <div class="col-md-12 text-center" v-if="resultsExist">
        <img class="fas fa-thumbs-up fa-5x"/>
        <br/>
        <h1>Run complete. Loading results. Redirecting...</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import path from 'path';

  import { LOG_FILE } from '@/models/dto/ProjectDto';
  import { RESULTS } from '@/router/constants';

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
      runInProgress() {
        return this.$store.state.Application.runInProgress;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
      resultsExist() {
        if (this.results !== null && !this.runInProgress) {
          setTimeout(() => this.$router.push({ path: RESULTS }).catch(() => {}), 5000);
          // this.$router.push({ path: RESULTS }).catch(() => {});
          return true;
        }
        return false;
      },
    },
  };
</script>
