<template>
  <div>
    <h3>Define your Components</h3>
    <hr>

    <h4>Technologies</h4>
      <router-link class="btn btn-lg btn-info"
                    v-for="solar in solarPVItems"
                    :to="{ name: 'technologySpecsSolarPV', params: { solarId: solar.id }}"
                    :key="solar.id">
        {{getTechLabel(solar)}}
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    v-for="battery in batteryItems"
                    :to="{ name: 'technologySpecsBattery', params: { batteryId: battery.id }}"
                    :key="battery.id">
        {{getTechLabel(battery)}}
      </router-link>

      <router-link class="btn btn-lg btn-info"
                    v-for="ice in iceItems"
                    :to="{ name: 'technologySpecsICE', params: { iceId: ice.id }}"
                    :key="ice.id">
        {{getTechLabel(ice)}}
      </router-link>

      <router-link class="btn btn-lg btn-info"
                    v-for="dieselGen in dieselGenItems"
                    :to="{ name: 'technologySpecsDieselGen', params: { dieselGenId: dieselGen.id }}"
                    :key="dieselGen.id">
        {{getTechLabel(dieselGen)}}
      </router-link>
    <hr>

    <h4>Services</h4>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_SITE_INFORMATION_PATH">
        Site Information
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_DEFERRAL_PATH"
                    v-if="objectivesDeferral">
        Deferral
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_FR_PATH"
                    v-if="objectivesFR">
        Frequency Regulation
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_NSR_PATH"
                    v-if="objectivesNSR">
        Non-Spinning Reserves
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_RESILIENCE_PATH"
                    v-if="objectivesResilience">
        Reliability
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_SR_PATH"
                    v-if="objectivesSR">
        Spinning Reserves
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_USER_DEFINED_PATH"
                    v-if="objectivesUserDefined">
        Custom Service
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.OBJECTIVES_DA_PATH"
                    v-if="objectivesDA">
        Day Ahead Pricing
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
                    v-if="objectivesRetailEnergyChargeReduction||objectivesRetailDemandChargeReduction">
        Retail Tariff
      </router-link>
    <hr>

    <h4>Financial</h4>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.FINANCIAL_INPUTS_PATH">
        Miscellaneous Inputs
      </router-link>
      <router-link class="btn btn-lg btn-info"
                    :to="this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH">
        External Incentives
      </router-link>

  </div>
</template>

<script>
  import * as paths from '@/router/constants';

  export default {
    data() {
      return {
        paths,
        fieldsGen: [
          { key: 'tagname', label: 'Generators' },
          { key: 'buttons', label: '' },
        ],
        fieldsIR: [
          { key: 'tagname', label: 'Intermittent Resources' },
          { key: 'buttons', label: '' },
        ],
        fieldsESS: [
          { key: 'tagname', label: 'Energy Storage Systems' },
          { key: 'buttons', label: '' },
        ],
      };
    },
    computed: {
      techGen() {
        return this.$store.state.Project.listOfActiveTechnologies.Generator;
      },
      techIR() {
        return this.$store.state.Project.listOfActiveTechnologies['Intermittent Resource'];
      },
      techESS() {
        return this.$store.state.Project.listOfActiveTechnologies['Energy Storage System'];
      },
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
    methods: {
      getTechLabel(payload) {
        if (payload.name) {
          return `${payload.tag}: ${payload.name}`;
        }
        return `Undefined ${payload.tag}`;
      },
      save() {
      },
    },
  };
</script>
