<template>
  <div class="container body-content">

    <div class="jumbotron dervet-title">
      <h1>DER-VET</h1>
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
        <b-dropdown text="Quick Start"
                    toggle-class="btn btn-lg btn-light btn-quick-start btn-index-page">
          <b-dropdown-item v-for="option in useCases" v-bind:key="option.id"
                           v-on:click.native="loadQuickStartProject(option.value)">
            {{option.text}}
          </b-dropdown-item>
        </b-dropdown>
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
          Load a pre-defined case.
        </p>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-12">
        <p>
          DER-VET<sup>TM</sup> is a modeling tool that provides a platform for the calculation and understanding of the value of energy storage, other distributed energy resources (DER), and microgrids based on their technical merits and constraints. It uses load and other data to determine the optimal size, duration, and technical characteristics for energy storage and/or solar systems, demand response application, etc. to maximize benefits based on the building's electric tariff and the value that can be extracted from the use cases.
        </p>
        <p>
          Made possible through funding support from the California Energy Commission.
        </p>
      </div>
    </div>
  </div>


</template>

<script language="ts">
  import { LOAD_QUICK_START_PROJECT } from '@/store/actionTypes';
  import { WIZARD_START_PATH } from '@/router/constants';
  import * as a from '@/store/actionTypes';
  
  const useCases = [
    { id: 1, value: 'billReductionProject', text: 'General DER Bill Reduction' },
    { id: 2, value: 'reliabilityProject', text: 'General DER Sizing for Reliability' },
    { id: 3, value: 'ERCOTMarketService', text: 'ERCOT Market Case' },
  ];

  export default {
    name: 'index',
    data() {
      return {
        WIZARD_START_PATH,
        selectedUseCase: null,
        useCases,
      };
    },
    computed: {
      projID() {
        return this.$store.state.Project.id;
      },
    },
    methods: {
      loadQuickStartProject(selectedUseCase) {
        this.$store.dispatch('resetProjectToDefault')
          .then(this.$store.dispatch('resetResultToDefault', this.$store.state.Project.id))
          .then(this.$store.dispatch(`Application/${a.RESET_APPLICATION_TO_DEFAULT}`, this.$store.state.Project.id))
          .then(this.$store.dispatch('resetZipCode'))
          .then(this.$store.dispatch(LOAD_QUICK_START_PROJECT, selectedUseCase))
          .then(this.$store.dispatch('Application/setQuickStartCompleteness'))
          .then(this.$store.dispatch(`Application/${a.SET_QUICK_START_ERROR_LIST}`, selectedUseCase))
          .then(this.$router.push({ path: WIZARD_START_PATH }));
      },
      resetProjectToDefault() {
        this.$store.dispatch('resetProjectToDefault')
          .then(this.$store.dispatch('resetResultToDefault', this.$store.state.Project.id))
          .then(this.$store.dispatch(`Application/${a.RESET_APPLICATION_TO_DEFAULT}`, this.$store.state.Project.id))
          .then(this.$store.dispatch('resetZipCode'))
          .then(this.$router.push({ path: WIZARD_START_PATH }));
      },
    },
  };
</script>
