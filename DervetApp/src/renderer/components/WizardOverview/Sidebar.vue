<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <!-- tell user that they dont have to fill everything out in one go -->
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isActive(this.paths.PROJECT_CONFIGURATION) || this.isActive(this.paths.WIZARD_OVERVIEW),
          incomplete: !isComplete('start') }"
                   :to="this.paths.PROJECT_CONFIGURATION">
        Project Configuration
      </router-link>
      <!--  descripe page and what you do here -->

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isActive(this.paths.OBJECTIVES),
          incomplete: !isComplete('objectives') }"
                   :to="this.paths.OBJECTIVES">
        Services
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isActive(this.paths.TECH_SPECS),
          incomplete: !isComplete('technologySpecs') }"
                   :to="this.paths.TECH_SPECS">
        Distributed Energy Resources
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.CAL_ENVIRO_SCREEN) }"
                   :to="this.paths.CAL_ENVIRO_SCREEN">
        CalEnviroScreen
      </router-link>
      <!--  descripe page and what you do here: use full name California Communities Environmental Health Screening Tool (for california users only) -->

    </b-nav>
  </div>
</template>


<script>
  import * as paths from '@/router/constants';

  export default {
    data() {
      return {
        paths,
      };
    },
    methods: {
      isActive(path) {
        return path === this.$route.path;
      },
      isComplete(page) {
        return this.$store.state.Application.pageCompleteness.overview[page];
      },
    },
  };
</script>
