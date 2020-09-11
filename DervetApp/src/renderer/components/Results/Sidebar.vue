<template>
  <div class="left-sidebar">
    <b-nav vertical>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.results) }"
          :to="this.pagePaths.results">
          Summary
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.resultsDesign) }"
          :to="this.pagePaths.resultsDesign">
          Design
          </router-link>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.resultsReliability) }"
          :to="this.pagePaths.resultsReliability">
          Reliability
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.resultsDeferral) }"
          :to="this.pagePaths.resultsDeferral">
          Deferral
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.resultsFinancial) }"
          :to="this.pagePaths.resultsFinancial">
          Financial
        </router-link>
    </b-nav>
    <div class="export-project">
      <router-link class="btn btn-md btn-primary" to="/">Export Project</router-link>
    </div>
  </div>
</template>


<script>
  export default {
    methods: {
      isActive(path) {
        return RegExp(path).test(this.$route.path);
      },
    },
    data() {
      const p = this.$store.state.Project;
      return {
        pagePaths: p.paths,
      };
    },
  };
</script>
