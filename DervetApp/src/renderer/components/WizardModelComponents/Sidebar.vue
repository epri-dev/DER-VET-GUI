<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActual(this.paths.WIZARD_COMPONENT_PATH) }"
                   :to="this.paths.WIZARD_COMPONENT_PATH">
        Overview
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isCurrent(`${this.paths.WIZARD_COMPONENT_PATH}/technology-specs`),
          incomplete: isCompleteOverview('technologySpecs') }"
                   :to="this.paths.TECH_SPECS_PATH">
        Technologies
      </router-link>

      <div v-for="techTag in technologyLinks">
        <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                     v-for="techItem in techTag.items"
                     v-if="techItem.active"
                     :to="techPath(techTag.path, techItem)"
                     :key="techItem.id"
                     v-bind:class="{
            current: isCurrent(techPath(techTag.path, techItem)),
            incomplete: !techItem.complete }">
          {{ getTechLabel(techTag.title, techItem) }}
        </router-link>
      </div>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_PATH),
          incomplete: isCompleteOverview('objectives') }"
                   :to="this.paths.OBJECTIVES_PATH">
        Services
      </router-link>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_SITE_INFORMATION_PATH),
          incomplete: isComplete('objectives', 'siteInformation') }"
                   :to="this.paths.OBJECTIVES_SITE_INFORMATION_PATH">
        Site Information
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_DEFERRAL_PATH),
          incomplete: isComplete('objectives', 'deferral') }"
                   :to="this.paths.OBJECTIVES_DEFERRAL_PATH"
                   v-if="objectivesDeferral">
        Deferral
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_FR_PATH),
          incomplete: isComplete('objectives', 'FR') }"
                   :to="this.paths.OBJECTIVES_FR_PATH"
                   v-if="objectivesFR">
        Frequency Regulation
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_NSR_PATH),
          incomplete: isComplete('objectives', 'NSR') }"
                   :to="this.paths.OBJECTIVES_NSR_PATH"
                   v-if="objectivesNSR">
        Non-Spinning Reserves
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_RESILIENCE_PATH),
          incomplete: isComplete('objectives', 'resilience') }"
                   :to="this.paths.OBJECTIVES_RESILIENCE_PATH"
                   v-if="objectivesResilience">
        Reliability
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_SR_PATH),
          incomplete: isComplete('objectives', 'SR') }"
                   :to="this.paths.OBJECTIVES_SR_PATH"
                   v-if="objectivesSR">
        Spinning Reserves
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_USER_DEFINED_PATH),
          incomplete: isComplete('objectives', 'userDefined') }"
                   :to="this.paths.OBJECTIVES_USER_DEFINED_PATH"
                   v-if="objectivesUserDefined">
        Custom Service
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_DA_PATH),
          incomplete: isComplete('objectives', 'DA') }"
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
          incomplete: isComplete('financial', 'inputs') }"
                   :to="this.paths.FINANCIAL_INPUTS_PATH">
        Miscellaneous Inputs
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH),
          incomplete: isComplete('financial', 'externalIncentives') }"
                   :to="this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH">
        External Incentives
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH),
          incomplete: isComplete('financial', 'retailTariff') }"
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
      const p = this.$store.state.Project;
      return {
        paths,
        technologyLinks: [
          {
            title: 'PV',
            items: p.technologySpecsSolarPV,
            props: 'solarId',
            path: paths.TECH_SPECS_PV_PATH,
          },
          {
            title: 'Battery',
            items: p.technologySpecsBattery,
            props: 'batteryId',
            path: paths.TECH_SPECS_BATTERY_PATH,
          },
          {
            title: 'ICE',
            items: p.technologySpecsICE,
            props: 'iceId',
            path: paths.TECH_SPECS_ICE_PATH,
          },
          {
            title: 'Diesel',
            items: p.technologySpecsDieselGen,
            props: 'dieselGenId',
            path: paths.TECH_SPECS_DIESEL_PATH,
          },
          {
            title: 'Controllable Load',
            items: p.technologySpecsControllableLoad,
            props: 'id',
            path: paths.TECH_SPECS_CONTROLLABLE_LOAD_PATH,
          },
          {
            title: 'Single EV',
            items: p.technologySpecsSingleEV,
            props: 'id',
            path: paths.TECH_SPECS_SINGLE_EV_PATH,
          },
          {
            title: 'Fleet EV',
            items: p.technologySpecsFleetEV,
            props: 'id',
            path: paths.TECH_SPECS_FLEET_EV_PATH,
          },
        ],
      };
    },
    methods: {
      isCompleteOverview(page) {
        return !this.$store.state.Application.pageCompleteness.overview[page];
      },
      isComplete(pageKey, page) {
        return !this.$store.state.Application.pageCompleteness.components[pageKey][page];
      },
      techPath(basePath, payload) {
        return `${basePath}/${payload.id}`;
      },
      isCurrent(path) {
        return RegExp(path).test(this.$route.path);
      },
      isActual(path) {
        return path === this.$route.path;
      },
      getTechLabel(title, payload) {
        if (payload.name) {
          return `${title}: ${payload.name}`;
        }
        return `Undefined ${title}`;
      },
    },
    computed: {
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
