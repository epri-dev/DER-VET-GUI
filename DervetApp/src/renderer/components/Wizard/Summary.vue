<template>
  <div>
    <h3>Summary</h3>
    <hr />
    <form>
      <div class="form-horizontal form-buffer container">

        <h4>Setup</h4>
        <template>
          <b-table-lite thead-tr-class="d-none" fixed hover bordered striped
            :items="setup">
          </b-table-lite>
        </template>
        </br>

        {{ this.$store.state.Project }}

        <h4>Technology Specifications</h4>
        </br>


        <h4>Services</h4>
        <ul>
<!-- TODO : option for conditional list : the Services are not getting set to true here
          <li v-for="item in services2" :key="item.display" v-if=item.active>
            {{ item.display }}
          </li>
-->
          <li v-for="item in services" :key="item">
            {{ item }}
          </li>
        </ul>
        </br>


        <h4>Financial Inputs</h4>
        <template>
          <b-table-lite thead-tr-class="d-none" fixed hover bordered striped
            :items="finances">
          </b-table-lite>
        </template>
        </br>

        <h4>Scenario Analysis</h4>
        <template>
          <b-table-lite thead-tr-class="d-none" fixed hover bordered striped
            :items="scenario">
          </b-table-lite>
        </template>
        </br>

      <nav-buttons
        back-link="/wizard/sensitivity-analysis"
        continue-link="/wizard/run-analysis"
        continue-text="Run Analysis"
      />

      </div>
    </form>

  </div>
</template>

<script>
  import model from '@/models/StartProject';
  import NavButtons from './NavButtons';

  const { validation } = model;

  export default {
    components: { NavButtons },
    methods: {
      modeDescription() {
        const modeNum = 1;
        return validation.analysisHorizonMode.allowedValues[modeNum].description;
        // const modeNum = parseInt(this.$store.state.Project.analysisHorizonMode, 10);
        // return validation.analysisHorizonMode.allowedValues[modeNum].description;
      },
      getAnalysisHorizonModeDescription() {
        return this.$store.getters.getAnalysisHorizonModeDescription;
      },
    },
    data() {
      return {
        setup: [
          ['Project Name', this.$store.state.Project.name],
          ['Start Year', this.$store.state.Project.startYear],
          ['Analysis Horizon', `${this.$store.state.Project.analysisHorizon} years`],
          ['FIXME Analysis Horizon Mode', this.$store.state.Project.analysisHorizonMode],
          ['FIXME Mode', this.getAnalysisHorizonModeDescription()],
          ['FIXME Mode', this.modeDescription()],
          ['Data year', this.$store.state.Project.dataYear],
          ['Grid Domain', this.$store.state.Project.gridLocation],
          ['Ownership', this.$store.state.Project.ownership],
          ['Latitude', this.$store.state.Project.latitude],
          ['Longitude', this.$store.state.Project.longitude],
        ],
        services: this.$store.state.Project.listOfActiveServices,
        services2: [
          { active: this.$store.state.Project.objectivesResilience, display: 'Reliability' },
          { active: this.$store.state.Project.objectivesBackupPower, display: 'Backup Power' },
          { active: this.$store.state.Project.objectivesRetailEnergyChargeReduction, display: 'Retail Energy Charge Reduction' },
          { active: this.$store.state.Project.objectivesRetailDemandChargeReduction, display: 'Retail Demand Charge Reduction' },
          { active: this.$store.state.Project.objectivesSR, display: 'Spinning Reserves' },
          { active: this.$store.state.Project.objectivesNSR, display: 'Non-Spinning Reserves' },
          { active: this.$store.state.Project.objectivesDA, display: 'Day Ahead Energy Time Shift' },
          { active: this.$store.state.Project.objectivesDeferral, display: 'Deferral' },
          { active: this.$store.state.Project.objectivesFR, display: 'Frequency Regulation' },
          { active: this.$store.state.Project.objectivesLoadFollowing, display: 'Load Following' },
          { active: this.$store.state.Project.objectivesUserDefined, display: 'User Defined' },
        ],
        finances: [
          ['Discount rate', `${this.$store.state.Project.discountRate} %`],
          ['Inflation rate', `${this.$store.state.Project.inflationRate} %`],
          ['Federal tax rate', `${this.$store.state.Project.federalTaxRate} %`],
          ['State tax rate', `${this.$store.state.Project.stateTaxRate} %`],
          ['Property tax rate', `${this.$store.state.Project.propertyTaxRate} %`],
        ],
        scenario: [
          ['Number of Scenario Analysis Cases', 'Baseline'],
        ],
      };
    },
  };
</script>
