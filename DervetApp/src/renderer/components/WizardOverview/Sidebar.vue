<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isActive(this.paths.PROJECT_CONFIGURATION) || this.isActive(this.paths.WIZARD_OVERVIEW),
          incomplete: !isComplete('start') }"
                   :to="this.paths.PROJECT_CONFIGURATION">
        Project Configuration
      </router-link>

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
        Technology Specifications
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.CAL_ENVIRO_SCREEN) }"
                   :to="this.paths.CAL_ENVIRO_SCREEN">
        CalEnviroScreen
      </router-link>

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
