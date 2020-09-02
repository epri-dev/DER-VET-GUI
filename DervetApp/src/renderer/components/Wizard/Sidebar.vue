<template>
  <div class="left-sidebar">
    <b-nav vertical>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.startProject) }"
          :to="this.pagePaths.startProject">
          Project Configuration
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.techSpecs) }"
          :to="this.pagePaths.techSpecs">
          Technology Specifications
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="solar in solarPVItems"
          :to="{ name: 'technologySpecsSolarPV', params: { solarId: solar.id }}"
          :key="solar.id"
          v-bind:class="{
            current: techSpecsActiveSaved('solar-pv', solar.id),
            complete: solar.active,
            incomplete: !solar.active }">
          PV: {{ solar.name }}
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="battery in batteryItems"
          :to="{ name: 'technologySpecsBattery', params: { batteryId: battery.id }}"
          :key="battery.id"
          v-bind:class="{ current: techSpecsActiveSaved('battery', battery.id),
            complete: battery.active,
            incomplete: !battery.active }">
          Battery: {{ battery.name }}
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-for="ice in iceItems"
          :to="{ name: 'technologySpecsICE', params: { iceId: ice.id }}"
          :key="ice.id"
          v-bind:class="{ current: techSpecsActiveSaved('ice', ice.id),
            complete: ice.active,
            incomplete: !ice.active }">
          ICE: {{ ice.name }}
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
          v-bind:class="{ current: isActive(this.pagePaths.objectives) }"
          :to="this.pagePaths.objectives">
          Services
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesSiteInformation) }"
          :to="this.pagePaths.objectivesSiteInformation">
          Site Information
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesDeferral) }"
          :to="this.pagePaths.objectivesDeferral"
          v-if="objectivesDeferral">
          Deferral
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesFR) }"
          :to="this.pagePaths.objectivesFR"
          v-if="objectivesFR">
          Frequency Regulation
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesNSR) }"
          :to="this.pagePaths.objectivesNSR"
          v-if="objectivesNSR">
          Non-Spinning Reserves
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesResilience) }"
          :to="this.pagePaths.objectivesResilience"
          v-if="objectivesResilience">
          Reliability
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesSR) }"
          :to="this.pagePaths.objectivesSR"
          v-if="objectivesSR">
          Spinning Reserves
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesUserDefined) }"
          :to="this.pagePaths.objectivesUserDefined"
          v-if="objectivesUserDefined">
          Custom Service
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.objectivesDA) }"
          :to="this.pagePaths.objectivesDA"
          v-if="objectivesDA">
          Day Ahead Pricing
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.financialInputs) }"
          :to="this.pagePaths.financialInputs">
          Financial Inputs
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.financialInputsExternalIncentives) }"
          :to="this.pagePaths.financialInputsExternalIncentives">
          External Incentives
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-indent"
          v-bind:class="{ current: isActive(this.pagePaths.financialInputsRetailTariff) }"
          :to="this.pagePaths.financialInputsRetailTariff"
          v-if="objectivesRetailEnergyChargeReduction||objectivesRetailDemandChargeReduction">
          Retail Tariff
        </router-link>

        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.sensitivityAnalysis) }"
          :to="this.pagePaths.sensitivityAnalysis">
          Scenario Analysis
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.summary) }"
          :to="this.pagePaths.summary
          ">
          Summary
        </router-link>
        <router-link
          class="nav nav-sidebar sidebar-root-el"
          v-bind:class="{ current: isActive(this.pagePaths.results) }"
          :to="this.pagePaths.results">
          Results
        </router-link>
    </b-nav>
    <div class="export-project">
      <router-link class="btn btn-md btn-primary" to="/">Export Project</router-link>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      const p = this.$store.state.Project;
      return {
        pagePaths: p.paths,
      };
    },
    methods: {
      techSpecsComplete(active) {
        return active;
      },
      techSpecsActiveSaved(tech, id) {
        return RegExp(`${this.pagePaths.techSpecs}-${tech}.*/${id}`).test(this.$route.path);
      },
      techSpecsActiveUnsaved(tech) {
        return RegExp(`${this.pagePaths.techSpecs}-${tech}/null`).test(this.$route.path);
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
      objectivesRetailEnergyChargeReduction() {
        return this.$store.state.Project.objectivesRetailEnergyChargeReduction;
      },
      objectivesDA() {
        return this.$store.state.Project.objectivesDA;
      },
      objectivesResilience() {
        return this.$store.state.Project.objectivesResilience;
      },
      objectivesBackupPower() {
        return this.$store.state.Project.objectivesBackupPower;
      },
      objectivesRetailDemandChargeReduction() {
        return this.$store.state.Project.objectivesRetailDemandChargeReduction;
      },
      objectivesSR() {
        return this.$store.state.Project.objectivesSR;
      },
      objectivesNSR() {
        return this.$store.state.Project.objectivesNSR;
      },
      objectivesFR() {
        return this.$store.state.Project.objectivesFR;
      },
      objectivesDeferral() {
        return this.$store.state.Project.objectivesDeferral;
      },
      objectivesLoadFollowing() {
        return this.$store.state.Project.objectivesLoadFollowing;
      },
      objectivesUserDefined() {
        return this.$store.state.Project.objectivesUserDefined;
      },
    },
  };
</script>
