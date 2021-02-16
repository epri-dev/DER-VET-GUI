<template>
  <div>
    <b-navbar fixed="top" type="dark" variant="dark">
      <b-navbar-brand>DER-VET</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- TODO add disabled attribute to show/hide buttons based on the state of the project -->
          <b-nav-item :active="isActiveIndex(INDEX)"
                      :to="INDEX">
            Home
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_OVERVIEW)"
                      :to="WIZARD_OVERVIEW">
            Project Overview
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_COMPONENT)"
                      :to="WIZARD_COMPONENT">
            Model Components
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_RUN_CASE)"
                      :to="WIZARD_RUN_CASE">
            Summary
          </b-nav-item>
          <b-nav-item :active="isActive(RESULTS)"
                      :to="RESULTS"
                      v-if="resultsExist">
            Results
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import {
    INDEX,
    WIZARD_OVERVIEW,
    WIZARD_COMPONENT,
    RESULTS,
    WIZARD_RUN_CASE,
  } from '@/router/constants';

  export default {
    data() {
      return {
        INDEX,
        WIZARD_OVERVIEW,
        WIZARD_COMPONENT,
        RESULTS,
        WIZARD_RUN_CASE,
      };
    },
    computed: {
      resultsExist() {
        return this.$store.state.Results.data !== null;
      },
    },
    methods: {
      isActiveIndex() {
        return this.$route.path === INDEX;
      },
      isActive(path) {
        return new RegExp(path).test(this.$route.path);
      },
    },
  };
</script>

