<template>
  <div class="container body-content">

    <div class="jumbotron dervet-title">
      <h1>DER-VET Alpha Test</h1>
    </div>

    <div class="row buffer-bottom">
      <div class="col-md-4 text-center">
        <router-link :to="$route.path"
                     class="btn btn-lg btn-warning btn-index-page text-white"
                     v-on:click.native="resetProjectToDefault()">
          Start a New Analysis
        </router-link>
      </div>
      <div class="col-md-4 text-center">
        <router-link to="/import-project"
                     class="btn btn-lg btn-info btn-index-page">
          Import Existing Project
        </router-link>
      </div>
      <div class="col-md-4 text-center">
        <router-link :to="$route.path"
                     class="btn btn-lg btn-light btn-index-page btn-quick-start"
                     v-on:click.native="loadQuickStartProject()">
          Quick Start
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <p>
          To start an analysis, click the <b>Start a New Analysis</b> button above. You will
          then be prompted to specify the type of analysis to run and to enter all relevant input data.
          Once you've entered all the needed data, the DER-VET analysis will begin. This can take several
          minutes to complete.
        </p>
      </div>
      <div class="col-md-4">
        <p>
          You can load a previously exported project by clicking the <b>Import Existing Project</b> button above.
          You will then be prompted to select the ZIP file that contains the project data and accompanying time series
          data.
        </p>
      </div>
      <div class="col-md-4">
        <p>
          Load a quick-start general DER bill reduction case.
        </p>
      </div>
    </div>
  </div>


</template>

<script>
  import { WIZARD_START_PATH } from '@/router/constants';

  export default {
    name: 'index',
    data() {
      return { WIZARD_START_PATH };
    },
    computed: {
      projID() {
        return this.$store.state.Project.id;
      },
    },
    methods: {
      loadQuickStartProject() {
        this.$store.dispatch('resetProjectToDefault')
          .then(this.$store.dispatch('resetResultToDefault', this.$store.state.Project.id))
          .then(this.$store.dispatch('Application/resetApplicationToDefault', this.$store.state.Project.id))
          .then(this.$store.dispatch('loadQuickStartProject'))
          .then(this.$store.dispatch('Application/setQuickStartCompleteness'))
          .then(this.$router.push({ path: WIZARD_START_PATH }));
      },
      resetProjectToDefault() {
        this.$store.dispatch('resetProjectToDefault')
          .then(this.$store.dispatch('resetResultToDefault', this.$store.state.Project.id))
          .then(this.$store.dispatch('Application/resetApplicationToDefault', this.$store.state.Project.id))
          .then(this.$router.push({ path: WIZARD_START_PATH }));
      },
    },
  };
</script>
