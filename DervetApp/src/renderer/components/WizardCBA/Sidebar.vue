<template>
  <div class="left-sidebar">
    <b-nav vertical>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.paths.FINANCIAL_INPUTS_PATH) }"
          :to="this.paths.FINANCIAL_INPUTS_PATH">
          Financial Inputs
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH) }"
          :to="this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH">
          External Incentives
        </router-link>

    </b-nav>
    <div class="export-project">
      <router-link class="btn btn-md btn-primary" to="/">Export Project</router-link>
    </div>
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
