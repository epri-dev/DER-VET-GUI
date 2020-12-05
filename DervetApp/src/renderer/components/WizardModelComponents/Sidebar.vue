<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isCurrent(this.paths.WIZARD_COMPONENT_PATH) }"
                   :to="this.paths.WIZARD_COMPONENT_PATH">
        Overview
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isCurrent(`${this.paths.WIZARD_COMPONENT_PATH}/technology-specs`) }"
                   :to="this.paths.TECH_SPECS_PATH">
        Technologies
      </router-link>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="solar in solarPVItems"
                   v-if="solar.active"
                   :to="{ name: 'technologySpecsSolarPV', params: { solarId: solar.id }}"
                   :key="solar.id"
                   v-bind:class="{
          current: isCurrentTech(solar),
          incomplete: !solar.complete }">
        {{ getTechLabel(solar) }}
      </router-link>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="battery in batteryItems"
                   v-if="battery.active"
                   :to="{ name: 'technologySpecsBattery', params: { batteryId: battery.id }}"
                   :key="battery.id"
                   v-bind:class="{
          current: isCurrentTech(battery),
          incomplete: !battery.complete }">
        {{ getTechLabel(battery) }}
      </router-link>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="ice in iceItems"
                   v-if="ice.active"
                   :to="{ name: 'technologySpecsICE', params: { iceId: ice.id }}"
                   :key="ice.id"
                   v-bind:class="{
          current: isCurrentTech(ice),
          incomplete: !ice.complete }">
        {{ getTechLabel(ice) }}
      </router-link>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="dieselGen in dieselGenItems"
                   v-if="dieselGen.active"
                   :to="{ name: 'technologySpecsDieselGen', params: { dieselGenId: dieselGen.id }}"
                   :key="dieselGen.id"
                   v-bind:class="{
          current: isCurrentTech(dieselGen),
          incomplete: !dieselGen.complete }">
        {{ getTechLabel(dieselGen) }}
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isCurrent(`${this.paths.WIZARD_COMPONENT_PATH}/objectives`) }"
                   :to="this.paths.OBJECTIVES_PATH">
        Services
      </router-link>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_SITE_INFORMATION_PATH),
          incomplete: isComplete('objectivesSiteInformation') }"
                   :to="this.paths.OBJECTIVES_SITE_INFORMATION_PATH">
        Site Information
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_DEFERRAL_PATH),
          incomplete: isComplete('objectivesDeferral') }"
                   :to="this.paths.OBJECTIVES_DEFERRAL_PATH"
                   v-if="objectivesDeferral">
        Deferral
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_FR_PATH),
          incomplete: isComplete('objectivesFR') }"
                   :to="this.paths.OBJECTIVES_FR_PATH"
                   v-if="objectivesFR">
        Frequency Regulation
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_NSR_PATH),
          incomplete: isComplete('objectivesNSR') }"
                   :to="this.paths.OBJECTIVES_NSR_PATH"
                   v-if="objectivesNSR">
        Non-Spinning Reserves
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_RESILIENCE_PATH),
          incomplete: isComplete('objectivesResilience') }"
                   :to="this.paths.OBJECTIVES_RESILIENCE_PATH"
                   v-if="objectivesResilience">
        Reliability
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_SR_PATH),
          incomplete: isComplete('objectivesSR') }"
                   :to="this.paths.OBJECTIVES_SR_PATH"
                   v-if="objectivesSR">
        Spinning Reserves
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_USER_DEFINED_PATH),
          incomplete: isComplete('objectivesUserDefined') }"
                   :to="this.paths.OBJECTIVES_USER_DEFINED_PATH"
                   v-if="objectivesUserDefined">
        Custom Service
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_DA_PATH),
          incomplete: isComplete('objectivesDA') }"
                   :to="this.paths.OBJECTIVES_DA_PATH"
                   v-if="objectivesDA">
        Day Ahead Pricing
      </router-link>

      <!-- TODO: make this the ssme color as a router-link ?
        I like it, makes it clear that its not a link (HN)-->
      <div class="nav nav-sidebar sidebar-root-el text-decoration-none"
           v-bind:class="{ current: isCurrent(`${this.paths.WIZARD_COMPONENT_PATH}/financial`) }">
        Finances
      </div>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(`${this.paths.FINANCIAL_INPUTS_PATH}$`),
          incomplete: isComplete('financialInputs') }"
                   :to="this.paths.FINANCIAL_INPUTS_PATH">
        Miscellaneous Inputs
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isCurrent(this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH) }"
                   :to="this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH">
        External Incentives
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{ current: isCurrent(this.paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH) }"
                   :to="this.paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
                   v-if="objectivesRetailEnergyChargeReduction||objectivesRetailDemandChargeReduction">
        Retail Tariff
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isCurrent(this.paths.SENSITIVITY_ANALYSIS_PATH) }"
                   :to="this.paths.SENSITIVITY_ANALYSIS_PATH">
        Scenario Analysis
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
      isComplete(page) {
        return !this.$store.state.Application.pageCompleteness.components[page];
      },
      isCurrentTech(payload) {
        const techPath = this.getTechBasePath(payload.tag);
        return RegExp(`${techPath}.*/${payload.id}`).test(this.$route.path);
      },
      isCurrent(path) {
        return RegExp(path).test(this.$route.path);
      },
      getTechBasePath(techTag) {
        let techPath = '';
        if (techTag === 'PV') {
          techPath = this.paths.TECH_SPECS_PV_PATH;
        } else if (techTag === 'Battery') {
          techPath = this.paths.TECH_SPECS_BATTERY_PATH;
        } else if (techTag === 'ICE') {
          techPath = this.paths.TECH_SPECS_ICE_PATH;
        } else if (techTag === 'DieselGen') {
          techPath = this.paths.TECH_SPECS_DIESEL_PATH;
        }
        return techPath;
      },
      getTechLabel(payload) {
        if (payload.name !== null) {
          return `${payload.tag}: ${payload.name}`;
        }
        return `Undefined ${payload.tag}`;
      },
    },
    computed: {
      solarPVItems() {
        return this.$store.state.Project.technologySpecsSolarPV;
      },
      iceItems() {
        return this.$store.state.Project.technologySpecsICE;
      },
      dieselGenItems() {
        return this.$store.state.Project.technologySpecsDieselGen;
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
