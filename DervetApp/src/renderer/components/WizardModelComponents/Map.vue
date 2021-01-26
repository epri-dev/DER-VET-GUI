<template>
  <div class="container-fluid">
    <h3>Define your Components</h3>
    <hr>

    <h4>Technologies</h4>
    <div class="row align-items-center" v-for="tagItems in techSpecs" key:bind="tagItems.tag">
      <div class="col-md-4 buffer-bottom" v-for="techItem in filterNonActives(tagItems.items)">
        <b-button block size="lg"
                  :to="techPath(tagItems.path, techItem)"
                  v-bind:class="{ 'incomplete-btn': !techItem.complete }"
                  :key="techItem.id">
          {{getTechLabel(tagItems.shortHand, techItem)}}
        </b-button>
      </div>
    </div>
    <hr>

    <h4>Services</h4>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_SITE_INFORMATION_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'siteInformation') }">
          Site Information
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesDeferral">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_DEFERRAL_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'deferral') }">
          Deferral
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesFR">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_FR_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'FR') }">
          Frequency Regulation
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesLF">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_LF_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'LF') }">
          Load Following
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesNSR">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_NSR_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'NSR') }">
          Non-Spinning Reserves
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesResilience">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_RESILIENCE_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'resilience') }">
          Reliability
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesSR">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_SR_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'SR') }">
          Spinning Reserves
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesUserDefined">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_USER_DEFINED_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'userDefined') }">
          Custom Service
        </b-button>
      </div>

      <div class="col-md-4 buffer-bottom" v-if="objectivesDA">
        <b-button block size="lg"
                  :to="this.paths.OBJECTIVES_DA_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('objectives', 'DA') }">
          Day Ahead Pricing
        </b-button>
      </div>

    </div>
    <hr>

    <h4>Financial</h4>
    <div class="row align-items-center">
      <div class="col-md-4">
        <b-button block size="lg"
                  :to="this.paths.FINANCIAL_INPUTS_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('financial', 'inputs') }">
          Miscellaneous Inputs
        </b-button>
      </div>
      <div class="col-md-4">
        <b-button block size="lg"
                  :to="this.paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('financial', 'externalIncentives') }">
          External Incentives
        </b-button>
      </div>
      <div class="col-md-4"
           v-if="objectivesRetailEnergyChargeReduction||objectivesRetailDemandChargeReduction">
        <b-button block size="lg"
                  :to="this.paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
                  v-bind:class="{ 'incomplete-btn': isComplete('financial', 'retailTariff') }">
          Retail Tariff
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
  import * as paths from '@/router/constants';
  import technologySpecsMixin from '@/mixins/technologySpecsMixin';

  export default {
    mixins: [technologySpecsMixin],
    data() {
      return {
        paths,
        objectiveCards: [],
        financialCards: [],
      };
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
      objectivesLF() {
        return this.$store.state.Project.objectivesLF;
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
      isComplete(pageKey, page) {
        return !this.$store.state.Application.pageCompleteness.components[pageKey][page];
      },
      save() {
      },
    },
  };
</script>
