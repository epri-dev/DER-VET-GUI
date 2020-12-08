<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isActive(this.paths.START_PROJECT_PATH),
          incomplete: !isComplete('start') }"
                   :to="this.paths.START_PROJECT_PATH">
        Project Configuration
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isActive(this.paths.OBJECTIVES_PATH),
          incomplete: !isComplete('objectives') }"
                   :to="this.paths.OBJECTIVES_PATH">
        Services
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isActive(this.paths.TECH_SPECS_PATH),
          incomplete: false }"
                   :to="this.paths.TECH_SPECS_PATH">
        Technology Specifications
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
        return RegExp(path).test(this.$route.path);
      },
      isComplete(page) {
        return this.$store.state.Application.pageCompleteness.overview[page];
      },
    },
  };
</script>
