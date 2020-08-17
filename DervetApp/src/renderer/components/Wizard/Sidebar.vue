<template>
  <div class="left-sidebar">
    <b-nav vertical>
        <router-link class="nav nav-sidebar sidebar-root-el" to="/wizard/start-project">
          Project Configuration
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: techSpecsActive }"
          to="/wizard/technology-specs">
          Technology Specification
        </router-link>

        <!-- TODO add router link that appears when adding a new solar spec -->
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="solar in solarPVItems"
          :to="{ name: 'technologySpecsSolarPV', params: { solarId: solar.id }}"
          :key="solar.id">
          Solar PV ({{ solar.name }})
        </router-link>

<!--        <router-link class="nav nav-sidebar sidebar-indent" to="/wizard/technology-specs-battery-storage" v-if=true>
          Battery Storage
        </router-link>
-->
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="ice in iceItems"
          :to="{ name: 'technologySpecsICE', params: { iceId: ice.id }}"
          :key="ice.id"
          v-bind:class="{ current: techSpecsActiveSaved('ice', ice.id) }">
          Internal Combustion Engine ({{ ice.name }})
        </router-link>

        <div
          class="nav nav-sidebar sidebar-indent current"
          v-if="techSpecsActiveUnsaved('solarpv')">
          Solar PV
        </div>
        <div
          class="nav nav-sidebar sidebar-indent current"
          v-if="techSpecsActiveUnsaved('battery-storage')">
          Battery Storage
        </div>
        <div
          class="nav nav-sidebar sidebar-indent current"
          v-if="techSpecsActiveUnsaved('ice')">
          Internal Combustion Engine
        </div>

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
  const techSpecsPath = '/wizard/technology-specs';
  export default {
    methods: {
      techSpecsActiveSaved(tech, id) {
        return RegExp(`${techSpecsPath}-${tech}/${id}`).test(this.$route.path);
      },
      techSpecsActiveUnsaved(tech) {
        return RegExp(`${techSpecsPath}-${tech}/null`).test(this.$route.path);
      },
    },
    computed: {
      techSpecsActive() {
        return RegExp(techSpecsPath).test(this.$route.path);
      },
      solarPVItems() {
        return this.$store.state.Project.technologySpecsSolarPV;
      },
      iceItems() {
        return this.$store.state.Project.technologySpecsICE;
      },
    },
  };
</script>
