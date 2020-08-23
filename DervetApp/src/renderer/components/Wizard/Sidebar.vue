<template>
  <div class="left-sidebar">
    <b-nav vertical>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.startProjectPath) }"
          :to="this.startProjectPath">
          Project Configuration
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.techSpecsPath) }"
          :to="this.techSpecsPath">
          Technology Specification
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="solar in solarPVItems"
          :to="{ name: 'technologySpecsSolarPV', params: { solarId: solar.id }}"
          :key="solar.id"
          v-bind:class="{ current: techSpecsActiveSaved('solar-pv', solar.id) }">
          Solar PV ({{ solar.name }})
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="battery in batteryItems"
          :to="{ name: 'technologySpecsBattery', params: { batteryId: battery.id }}"
          :key="battery.id"
          v-bind:class="{ current: techSpecsActiveSaved('battery', battery.id) }">
          Battery Storage ({{ battery.name }})
        </router-link>

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
          v-if="techSpecsActiveUnsaved('solar-pv')">
          Solar PV
        </div>
        <div
          class="nav nav-sidebar sidebar-indent current"
          v-if="techSpecsActiveUnsaved('battery')">
          Battery Storage
        </div>
        <div
          class="nav nav-sidebar sidebar-indent current"
          v-if="techSpecsActiveUnsaved('ice')">
          Internal Combustion Engine
        </div>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.objectivesPath) }"
          :to="this.objectivesPath">
          Services
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.objectivesSiteInformationPath) }"
          :to="this.objectivesSiteInformationPath">
          Site Information
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.objectivesDeferralPath) }"
          :to="this.objectivesDeferralPath">
          Deferral
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.objectivesDAPath) }"
          :to="this.objectivesDAPath">
          Day Ahead Pricing
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.objectivesReliabilityPath) }"
          :to="this.objectivesReliabilityPath">
          Reliability
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.financialInputsPath) }"
          :to="this.financialInputsPath">
          Financial Inputs
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.financialInputsExternalIncentivesPath) }"
          :to="this.financialInputsExternalIncentivesPath">
          External Incentives
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.financialInputsRetailTariffPath) }"
          :to="this.financialInputsRetailTariffPath">
          Retail Tariff
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.sensitivityAnalysisPath) }"
          :to="this.sensitivityAnalysisPath">
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
    data() {
      return {
        startProjectPath: '/wizard/start-project',
        techSpecsPath: '/wizard/technology-specs',
        objectivesPath: '/wizard/objectives',
        objectivesSiteInformationPath: '/wizard/objectives-parameters-site-information',
        objectivesDeferralPath: '/wizard/objectives-parameters-deferral',
        objectivesDAPath: '/wizard/objectives-parameters-da',
        objectivesReliabilityPath: '/wizard/objectives-parameters-reliability',
        financialInputsPath: '/wizard/financial-inputs',
        financialInputsExternalIncentivesPath: '/wizard/financial-inputs-external-incentives',
        financialInputsRetailTariffPath: '/wizard/financial-inputs-retail-tariff',
        sensitivityAnalysisPath: '/wizard/sensitivity-analysis',
      };
    },
    methods: {
      techSpecsActiveSaved(tech, id) {
        return RegExp(`${this.techSpecsPath}-${tech}.*/${id}`).test(this.$route.path);
      },
      techSpecsActiveUnsaved(tech) {
        return RegExp(`${this.techSpecsPath}-${tech}/null`).test(this.$route.path);
      },
      isActive(path) {
        return RegExp(path).test(this.$route.path);
      },
    },
    computed: {
      solarPVItems() {
        return this.$store.state.Project.technologySpecsSolarPV;
      },
      iceItems() {
        return this.$store.state.Project.technologySpecsICE;
      },
      batteryItems() {
        return this.$store.state.Project.technologySpecsBattery;
      },
    },
  };
</script>
