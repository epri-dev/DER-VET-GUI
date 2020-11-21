<template>
  <div>
    <br />
    <form>
      <div class="form-horizontal form-buffer container">

        <h4>Project Configuration</h4>
        <template>
          <b-table-lite thead-tr-class="d-none" fixed hover bordered striped
            :items="setup">
          </b-table-lite>
        </template>
        </br>

        <h4>Technology Specifications</h4>
        <ul>
          <h5>Generators</h5>
          <ul>
            <li v-for="tech in techGen">
              {{ tech.tag + ': ' + tech.name }}
            </li>
          </ul>
        </ul>
        <ul>
          <h5>Intermittent Resources</h5>
          <ul>
            <li v-for="tech in techIR">
              {{ tech.tag + ': ' + tech.name }}
            </li>
          </ul>
        </ul>
        <ul>
          <h5>Energy Storage Systems</h5>
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

        <div class="form-group form-buffer row">
          <div class="col-md-5">
            <router-link
              v-on:click.native="exportProject"
              :to="this.$route.path"
              class="btn btn-lg btn-info pull-right">
              Export Project
            </router-link>
          </div>

          <div class="col-md-2"/>

          <div class="col-md-5">
            <router-link
              v-on:click.native="runInProgress() ? () => null : runDervet()"
              :event="runDervetDisabled() ? '' : 'click'"
              :to="RUN_ANALYSIS_PATH"
              class="btn btn-lg btn-danger pull-left">
              {{ runInProgress() ? 'Running Analysis...' : 'Run Analysis' }}
            </router-link>
          </div>
        </div>

      </div>


    </form>

  </div>
</template>

<script>
  import { RUN_ANALYSIS_PATH } from '@/router/constants';
  import model from '@/models/StartProject';
  import NavButtons from '@/components/Shared/NavButtons';
  import { getProjectFixture } from '@/assets/samples/projectFixture.js';

  const { validation } = model;

  export default {
    components: { NavButtons },
    methods: {
      modeDescription() {
        if (this.$store.state.Project.analysisHorizonMode === undefined) {
          return '';
        }
        const modeNum = parseInt(this.$store.state.Project.analysisHorizonMode, 10) - 1;
        return validation.analysisHorizonMode.allowedValues[modeNum].description;
      },
      getAnalysisHorizonDisplay() {
        const horizon = this.$store.state.Project.analysisHorizon;
        return horizon ? `${horizon} years` : '';
      },
      getRateDisplay(rate) {
        if (rate === undefined) {
          return '';
        }
        return `${rate} %`;
      },
      runDervetDisabled() {
        // TODO: Use vuelidate to check if there are any errors in the project config
        return false;
      },
      runInProgress() {
        return this.$store.state.ProjectResult.runInProgress;
      },
      exportProject() {
        return 'TODO: this will export the project';
      },
      runDervet() {
        // TODO: note that there is currently no validation, so calling this with an
        // incomplete Project object will likely result in an unhandled exception
        const p = this.$store.state.Project;
        const projectFixture = getProjectFixture(p.inputsDirectory, p.resultsDirectory);
        this.$store.dispatch('runDervet', projectFixture);
      },
    },
    data() {
      return {
        RUN_ANALYSIS_PATH,
        setup: [
          ['Project Name', (this.$store.state.Project.name || '')],
          ['Start Year', this.$store.state.Project.startYear],
          ['Analysis Horizon', this.getAnalysisHorizonDisplay()],
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
          ['Discount rate', this.getRateDisplay(this.$store.state.Project.discountRate)],
          ['Inflation rate', this.getRateDisplay(this.$store.state.Project.inflationRate)],
          ['Federal tax rate', this.getRateDisplay(this.$store.state.Project.federalTaxRate)],
          ['State tax rate', this.getRateDisplay(this.$store.state.Project.stateTaxRate)],
          ['Property tax rate', this.getRateDisplay(this.$store.state.Project.propertyTaxRate)],
        ],
        scenario: [
          ['FIXME Number of Scenario Analysis Cases', 'Baseline'],
        ],
      };
    },
  };
</script>
