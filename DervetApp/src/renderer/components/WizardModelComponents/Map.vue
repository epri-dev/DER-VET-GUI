<template>
  <div class="container-fluid">
    <h3>Define your Components</h3>
    <hr>

    <h4>Technologies</h4>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="solar in solarPVItems">
        <b-button block size="lg"
                  v-if="solar.active"
                  :to="{ name: 'technologySpecsSolarPV', params: { solarId: solar.id }}"
                  v-bind:class="{ 'incomplete-btn': !solar.complete }"
                  :key="solar.id">
          {{getTechLabel(solar)}}
        </b-button>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="battery in batteryItems">
        <b-button block size="lg"
                  v-if="battery.active"
                  :to="{ name: 'technologySpecsBattery', params: { batteryId: battery.id }}"
                  v-bind:class="{ 'incomplete-btn': !battery.complete }"
                  :key="battery.id">
          {{getTechLabel(battery)}}
        </b-button>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="ice in iceItems">
        <b-button block size="lg"
                  v-if="ice.active"
                  :to="{ name: 'technologySpecsICE', params: { iceId: ice.id }}"
                  v-bind:class="{ 'incomplete-btn': !ice.complete }"
                  :key="ice.id">
          {{getTechLabel(ice)}}
        </b-button>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="dieselGen in dieselGenItems">
        <b-button block size="lg"
                  v-if="dieselGen.active"
                  :to="{ name: 'technologySpecsDieselGen', params: { dieselGenId: dieselGen.id }}"
                  v-bind:class="{ 'incomplete-btn': !dieselGen.complete }"
                  :key="dieselGen.id">
          {{getTechLabel(dieselGen)}}
        </b-button>
      </div>
    </div>
    <hr>

    <h4>Services</h4>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_SITE_INFORMATION_PATH">
          Site Information
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesDeferral">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_DEFERRAL_PATH">
          Deferral
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesFR">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_FR_PATH">
          Frequency Regulation
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesNSR">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_NSR_PATH">
          Non-Spinning Reserves
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesResilience">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_RESILIENCE_PATH">
          Reliability
        </b-button>
      </div>
    
      <div class="col-md-4 buffer-bottom" v-if="objectivesSR">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_SR_PATH">
          Spinning Reserves
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesUserDefined">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_USER_DEFINED_PATH">
          Custom Service
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesDA">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_DA_PATH">
          Day Ahead Pricing
        </b-button>
      </div>

    </div>
    <hr>

    <h4>Financial</h4>
    <div class="row align-items-center">
      <div class="col-md-4">
        <b-button block size="lg"
                  :to="this.paths.FINANCIAL_INPUTS_PATH">
          Miscellaneous Inputs
        </b-button>
      </div>
      <div class="col-md-4">
        <b-button block size="lg"
                  :to="this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH">
          External Incentives
        </b-button>
      </div>
      <div class="col-md-4" 
           v-if="objectivesRetailEnergyChargeReduction||objectivesRetailDemandChargeReduction">
        <b-button block size="lg"
                  :to="this.paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH">
          Retail Tariff
        </b-button>
      </div>
    </div>
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
