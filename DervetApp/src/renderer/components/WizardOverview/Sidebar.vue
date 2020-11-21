<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el"
                   v-bind:class="{ current: isActive(this.paths.START_PROJECT_PATH) }"
                   :to="this.paths.START_PROJECT_PATH">
        Project Configuration
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el"
                   v-bind:class="{ current: isActive(this.paths.OBJECTIVES_PATH) }"
                   :to="this.paths.OBJECTIVES_PATH">
        Services
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el"
                   v-bind:class="{ current: isActive(this.paths.TECH_SPECS_PATH) }"
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
    },
  };
</script>
