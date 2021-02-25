<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_PATH) }"
                   :to="this.paths.RESULTS_PATH">
        Summary
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_DISPATCH_PATH) }"
                   :to="this.paths.RESULTS_DISPATCH_PATH">
        Dispatch
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_DESIGN_PATH) }"
                   :to="this.paths.RESULTS_DESIGN_PATH">
        Design
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_FINANCIAL_PATH) }"
                   :to="this.paths.RESULTS_FINANCIAL_PATH">
        Financial
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-if="showReliabilityResults"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_RELIABILITY_PATH) }"
                   :to="this.paths.RESULTS_RELIABILITY_PATH">
        Reliability
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-if="showDeferralResults"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_DEFERRAL_PATH) }"
                   :to="this.paths.RESULTS_DEFERRAL_PATH">
        Deferral
      </router-link>
    </b-nav>
  </div>
</template>


<script>
  import * as paths from '@/router/constants';

  export default {
    computed: {
      results() {
        return this.$store.state.Results.data;
      },
      showReliabilityResults() {
        return this.$store.state.Results.data.showLoadCoverageProbability;
      },
      showDeferralResults() {
        return this.$store.state.Results.data.showDeferral;
      },
    },
    methods: {
      isActive(path) {
        // match to end of string here
        return RegExp(`${path}$`).test(this.$route.path);
      },
    },
    data() {
      return { paths };
    },
  };
</script>
