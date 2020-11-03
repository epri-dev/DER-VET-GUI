<template>
  <div class="container body-content">

    <div class="jumbotron dervet-title">
      <h1>DER-VET Alpha Test</h1>
    </div>

    <div class="row buffer-bottom">
      <div class="col-md-6 text-center">
        <router-link v-on:click.native="resetProjectToDefault()" :to="WIZARD_START_PATH" class="btn btn-lg btn-warning text-white">
          Start a New Analysis
        </router-link>
      </div>
      <div class="col-md-6 text-center">
        <router-link to="/import-project" class="btn btn-lg btn-info">
          Import Existing Project
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <h2>Getting started</h2>
        <p>
          To start an analysis, click the <b>Start a New Analysis</b> button above. You will
          then be prompted to specify the type of analysis to run and to enter all relevant input data.
          Once you've entered all the needed data, the DER-VET analysis will begin. This can take several
          minutes to complete.
        </p>
      </div>
      <div class="col-md-6">
        <h2>Import an existing project</h2>
        <p>
          You can load a previously exported project by clicking the <b>Import Existing Project</b> button above.
          You will then be prompted to select the ZIP file that contains the project data and accompanying time series
          data.
        </p>
      </div>
    </div>
  </div>
</div>

</template>

<script>
  import { WIZARD_START_PATH } from '@/router/constants';

  export default {
    name: 'index',
    methods: {
      resetProjectToDefault() {
        this.$store.dispatch('resetProjectToDefault');
      },
    },
    data() {
      return {
        WIZARD_START_PATH,
      };
    },
  };
</script>
