<template>
  <div>
    <b-navbar fixed="top" type="dark" variant="dark">
      <b-navbar-brand>DER-VET</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- TODO add disabled attribute to show/hide buttons based on the state of the project -->
          <b-nav-item :active="isActiveIndex(INDEX_PATH)"
                      :to="INDEX_PATH">
            Home
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_START_PATH)"
                      :to="WIZARD_START_PATH">
            Project Overview
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_COMPONENT_PATH)"
                      :to="WIZARD_COMPONENT_PATH">
            Model Components
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_RUN_CASE_PATH)"
                      :to="WIZARD_RUN_CASE_PATH">
            Summary
          </b-nav-item>
          <b-nav-item :active="isActive(RESULTS_PATH)"
                      :to="RESULTS_PATH"
                      :disabled="!resultsExist">
            Results
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import {
    INDEX_PATH,
    WIZARD_START_PATH,
    WIZARD_COMPONENT_PATH,
    RESULTS_PATH,
    WIZARD_RUN_CASE_PATH,
  } from '@/router/constants';

  export default {
    data() {
      return {
        INDEX_PATH,
        WIZARD_START_PATH,
        WIZARD_COMPONENT_PATH,
        RESULTS_PATH,
        WIZARD_RUN_CASE_PATH,
      };
    },
    computed: {
      resultsExist() {
        return this.$store.state.ProjectResult.data !== null;
      },
    },
    methods: {
      isActiveIndex() {
        return this.$route.path === INDEX_PATH;
      },
      isActive(path) {
        return new RegExp(path).test(this.$route.path);
      },
    },
  };
</script>

