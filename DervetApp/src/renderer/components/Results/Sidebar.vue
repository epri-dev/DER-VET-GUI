<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS) }"
                   :to="this.paths.RESULTS">
        Summary
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_DISPATCH) }"
                   :to="this.paths.RESULTS_DISPATCH">
        Dispatch
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_DESIGN) }"
                   :to="this.paths.RESULTS_DESIGN">
        Design
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_FINANCIAL) }"
                   :to="this.paths.RESULTS_FINANCIAL">
        Financial
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-if="showReliabilityResults"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_RELIABILITY) }"
                   :to="this.paths.RESULTS_RELIABILITY">
        Reliability
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-if="showDeferralResults"
                   v-bind:class="{ current: isActive(this.paths.RESULTS_DEFERRAL) }"
                   :to="this.paths.RESULTS_DEFERRAL">
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
