<template>
  <div>
    <b-navbar fixed="top" type="dark" variant="dark">
      <b-navbar-brand>DER-VET</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <!-- TODO add v-if to show/hide buttons based on the state of the project -->
          <b-nav-item :to="WIZARD_START_PATH">Project Overview</b-nav-item>
          <b-nav-item :to="WIZARD_COMPONENT_PATH">Model Components</b-nav-item>
          <b-nav-item :to="WIZARD_RUN_CASE_PATH">Run Case</b-nav-item>
          <b-nav-item :to="RESULTS_PATH" v-if="resultsExist">Results</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import {
    WIZARD_START_PATH,
    WIZARD_COMPONENT_PATH,
    RESULTS_PATH,
    WIZARD_RUN_CASE_PATH,
  } from '@/router/constants';

  export default {
    computed: {
      resultsExist() {
        return this.$store.state.ProjectResult.data !== null;
      },
    },
    data() {
      return {
        WIZARD_START_PATH,
        WIZARD_COMPONENT_PATH,
        RESULTS_PATH,
        WIZARD_RUN_CASE_PATH,
      };
    },
  };
</script>

