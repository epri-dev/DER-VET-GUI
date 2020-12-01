<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 text-center" v-if="runInProgress">
        <img src="../../assets/copper-loader.gif" />
        <br />
        <label>Running analysis for <b>{{projectName}}</b>. Please be patient as this can take several minutes to complete.</label>
      </div>
      <div class="col-md-12" v-else-if="resultsExist">
        <div>Redirecting...</div>
      </div>
      <div class="col-md-12 text-center" v-else-if="isError">
        <br/>
        <div>An error occured while running DER-VET: please check {{logPath}} for more details.</div>
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
        return this.$store.state.Application.isError !== null;
      },
      results() {
        return this.$store.state.ProjectResult.data;
      },
      logPath() {
        return path.join(this.$store.state.Project.resultsDirectory, LOG_FILE);
      },
      resultsExist() {
        if (this.$store.state.ProjectResult.data !== null) {
          this.$router.push({ path: RESULTS_PATH }).catch(() => {});
        }
        return this.$store.state.ProjectResult.data !== null;
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
