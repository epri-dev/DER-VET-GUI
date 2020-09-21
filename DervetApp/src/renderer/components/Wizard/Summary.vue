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

        <h4>Technology Specifications</h4>
        <ul>
          <h5>Generators:</h5>
          <ul>
            <li v-for="tech in techGen">
              {{ tech.tag + ': ' + tech.name }}
            </li>
          </ul>
        </ul>
        <ul>
          <h5>Intermittent Resources:</h5>
          <ul>
            <li v-for="tech in techIR">
              {{ tech.tag + ': ' + tech.name }}
            </li>
          </ul>
        </ul>
        <ul>
          <h5>Energy Storage Systems:</h5>
          <ul>
            <li v-for="tech in techESS">
              {{ tech.tag + ': ' + tech.name }}
            </li>
          </ul>
        </ul>
        </br>

        <h4>Services</h4>
        <ul>
          <li v-for="service in services">
            {{ service }}
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

      <!-- TODO rename save prop to something agnostic to the performed action -->
      <nav-buttons
        back-link="/wizard/sensitivity-analysis"
        continue-link="/wizard/run-analysis"
        continue-text="Run Analysis"
        :save="this.runDervet"
      />

      </div>
    </form>

  </div>
</template>

<script>
  import model from '@/models/StartProject';
  import NavButtons from '@/components/Shared/NavButtons';

  const { validation } = model;

  export default {
    components: { NavButtons },
    methods: {
      modeDescription() {
        const modeNum = parseInt(this.$store.state.Project.analysisHorizonMode, 10) - 1;
        return validation.analysisHorizonMode.allowedValues[modeNum].description;
      },
      runDervet() {
        // TODO: note that there is currently no validation, so calling this with an
        // incomplete Project object will likely result in an unhandled exception
        this.$store.dispatch('runDervet', this.$store.state.Project);
      },
    },
    data() {
      return {
        setup: [
          ['Project Name', this.$store.state.Project.name],
          ['Start Year', this.$store.state.Project.startYear],
          ['Analysis Horizon', `${this.$store.state.Project.analysisHorizon} years`],
          ['Analysis Horizon Mode', this.modeDescription()],
          ['Data year', this.$store.state.Project.dataYear],
          ['Grid Domain', this.$store.state.Project.gridLocation],
          ['Ownership', this.$store.state.Project.ownership],
          ['Latitude', this.$store.state.Project.latitude],
          ['Longitude', this.$store.state.Project.longitude],
        ],
        techGen: this.$store.state.Project.listOfActiveTechnologies.Generator,
        techIR: this.$store.state.Project.listOfActiveTechnologies['Intermittent Resource'],
        techESS: this.$store.state.Project.listOfActiveTechnologies['Energy Storage System'],
        services: this.$store.state.Project.listOfActiveServices,
        finances: [
          ['Discount rate', `${this.$store.state.Project.discountRate} %`],
          ['Inflation rate', `${this.$store.state.Project.inflationRate} %`],
          ['Federal tax rate', `${this.$store.state.Project.federalTaxRate} %`],
          ['State tax rate', `${this.$store.state.Project.stateTaxRate} %`],
          ['Property tax rate', `${this.$store.state.Project.propertyTaxRate} %`],
        ],
        scenario: [
          ['FIXME Number of Scenario Analysis Cases', 'Baseline'],
        ],
      };
    },
  };
</script>
