<template>
  <div class="left-sidebar">
    <b-nav vertical>
        <router-link class="nav nav-sidebar sidebar-root-el" to="/wizard/start-project">
          Project Configuration
        </router-link>
        <router-link class="nav nav-sidebar sidebar-root-el" to="/wizard/technology-specs">
          Technology Specifications
        </router-link>
        <!-- TODO add router link that appears when adding a new solar spec -->
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="solar, index in solarPVItems"
          :to="{ name: 'technologySpecsSolarPV', params: { solarIndex: index }}"
          :key="index">
          Solar PV ({{ solar.name }})
        </router-link>
        <router-link class="nav nav-sidebar sidebar-indent" to="/wizard/technology-specs-battery-storage" v-if="true">
          Battery Storage
        </router-link>
        <router-link class="nav nav-sidebar sidebar-indent" to="/wizard/technology-specs-ice" v-if="true">
          Internal Combustion Engine
        </router-link>
        <router-link class="nav nav-sidebar sidebar-root-el" to="/wizard/objectives">
          Services
        </router-link>
        <router-link class="nav nav-sidebar sidebar-indent" to="/wizard/objectives-parameters-site-information">
          Site Information
        </router-link>
        <router-link class="nav nav-sidebar sidebar-root-el" to="/wizard/financial-inputs">
          Financial Inputs
        </router-link>
        <router-link class="nav nav-sidebar sidebar-indent" to="/wizard/financial-inputs-external-incentives">
          External Incentives
        </router-link>
        <router-link class="nav nav-sidebar sidebar-root-el" to="/wizard/sensitivity-analysis">
          Scenario Analysis
        </router-link>
        <li class="nav nav-sidebar sidebar-root-el">
          <div class="menutext">Summary</div>
        </li>
        <li class="nav nav-sidebar sidebar-root-el">
          <div class="menutext">Results</div>
        </li>
    </b-nav>
    <div class="export-project">
      <router-link class="btn btn-md btn-primary" to="/">Export Project</router-link>
    </div>
  </div>
</template>


<script>
  export default {
    computed: {
      solarPVItems() {
        return this.$store.state.Project.technologySpecsSolarPV;
      },
    },
  };
</script>
