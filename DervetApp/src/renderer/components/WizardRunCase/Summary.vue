<template>
  <div>
    <br />
    <form>
      <div class="form-horizontal form-buffer container">

        <div v-if="overviewErrorExists()" class="incomplete">
          <h4>Errors in Project Overview</h4>
            <div v-for="overviewItem in overviewAll()">
              <div v-if="!overviewItem.complete">
                <li>
                  <router-link class="text-decoration-none"
                              :to=overviewItem.path>
                    {{ overviewItem.name }}
                  </router-link>
                  <ul>
                    <li v-for="error in overviewItem.errors">
                      <span v-html="error"></span>
                    </li>
                  </ul>
                </li>
              </div>
            </div>
        </div>

        <div v-if="componentTechErrorExists()" class="incomplete">
          <h4>Errors in Technology Components</h4>
          <div v-for="tech in techAll()">
            <div v-if="tech.complete !== true">
              <li>
                <router-link class="text-decoration-none"
                             :to="getTechPath(tech)">
                  {{ tech.technologyType + ': ' + tech.tag + getTechDisplayName(tech) }}
                </router-link>
                <ul>
                  <li v-for="error in tech.errorList">
                    <span v-html="error"></span>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>

        <div v-if="componentObjectiveErrorExists()" class="incomplete">
          <h4>Errors in Services Components</h4>
          <div v-for="service in activeServicesObject()">
            <div v-if="!service.complete">
              <li>
                <router-link class="text-decoration-none"
                             :to="service.path">
                  {{ service.name + notStartedText(service.complete) }}
                </router-link>
                <ul>
                  <li v-for="error in service.errors">
                    <span v-html="error"></span>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>

        <div v-if="componentFinancialErrorExists()" class="incomplete">
          <h4>Errors in Finances Components</h4>
          <div v-for="finance in activeFinancesObject()">
            <div v-if="!finance.complete">
              <li>
                <router-link class="text-decoration-none"
                             :to="finance.path">
                  {{ finance.name + notStartedText(finance.complete) }}
                </router-link>
                <ul>
                  <li v-for="error in finance.errors">
                    <span v-html="error"></span>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>

        </br>
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
              {{ tech.tag + getTechDisplayName(tech) }}
            </li>
          </ul>
        </ul>
        <ul>
          <h5>Intermittent Resources</h5>
          <ul>
            <li v-for="tech in techIR">
              {{ tech.tag + getTechDisplayName(tech) }}
            </li>
          </ul>
        </ul>
        <ul>
          <h5>Energy Storage Systems</h5>
          <ul>
            <li v-for="tech in techESS">
              {{ tech.tag + getTechDisplayName(tech) }}
            </li>
          </ul>
        </ul>
        </br>

        <h4>Services</h4>
        <ul>
          <li v-for="service in activeServices">
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

<!-- Under Construction
        <h4>Scenario Analysis</h4>
        <template>
          <b-table-lite thead-tr-class="d-none" fixed hover bordered striped
            :items="scenario">
          </b-table-lite>
        </template>
        </br>
-->

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
              v-on:click.native="(runInProgress() || runDervetDisabled()) ? () => null : runDervet()"
              :event="runDervetDisabled() ? '' : 'click'"
              :to="this.$route.path"
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
  import { flatten } from 'lodash';
  import * as paths from '@/router/constants';
  import { RUN_ANALYSIS_PATH } from '@/router/constants';
  import model from '@/models/StartProject';

  const { validation } = model;

  const NOT_STARTED = ': Not Started';

  const SERVICE_COMPONENTS_MAPPING = {
    siteInformation: {
      name: 'Site Information',
      path: paths.OBJECTIVES_SITE_INFORMATION_PATH,
      // empty list means that the component is always active
      activeVar: [],
    },
    deferral: {
      name: 'Deferral',
      path: paths.OBJECTIVES_DEFERRAL_PATH,
      // component is active if any item in the list is true
      activeVar: ['objectivesDeferral'],
    },
    FR: {
      name: 'Frequency Regulation',
      path: paths.OBJECTIVES_FR_PATH,
      activeVar: ['objectivesFR'],
    },
    NSR: {
      name: 'Non-Spinning Reserves',
      path: paths.OBJECTIVES_NSR_PATH,
      activeVar: ['objectivesNSR'],
    },
    resilience: {
      name: 'Reliability',
      path: paths.OBJECTIVES_RESILIENCE_PATH,
      activeVar: ['objectivesResilience'],
    },
    SR: {
      name: 'Spinning Reserves',
      path: paths.OBJECTIVES_SR_PATH,
      activeVar: ['objectivesSR'],
    },
    userDefined: {
      name: 'Custom Service',
      path: paths.OBJECTIVES_USER_DEFINED_PATH,
      activeVar: ['objectivesUserDefined'],
    },
    DA: {
      name: 'Day Ahead Pricing',
      path: paths.OBJECTIVES_DA_PATH,
      activeVar: ['objectivesDA'],
    },
  };
  const FINANCE_COMPONENTS_MAPPING = {
    inputs: {
      name: 'Miscellaneous Inputs',
      path: paths.FINANCIAL_INPUTS_PATH,
      activeVar: [],
    },
    externalIncentives: {
      name: 'External Incentives',
      path: paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH,
      activeVar: [],
    },
    retailTariff: {
      name: 'Retail Tariff',
      path: paths.FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
      activeVar: ['objectivesRetailEnergyChargeReduction', 'objectivesRetailDemandChargeReduction'],
    },
  };

  export default {
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
        return this.$store.state.Application.runInProgress;
      },
      exportProject() {
        return 'TODO: this will export the project';
      },
      runDervet() {
        // TODO: note that there is currently no validation, so calling this with an
        // incomplete Project object will likely result in an unhandled exception
        console.log('Running DER-VET');
        console.log(this.$store.state.Project);
        this.$store.dispatch('Application/runDervet', this.$store.state.Project)
          .then(this.$router.push({ path: RUN_ANALYSIS_PATH }));
      },

      // objectives (Services) components
      activeServicesObject() {
        const servicesObject = {};
        Object.entries(SERVICE_COMPONENTS_MAPPING).forEach(([key, value]) => {
          if (this.isActive(value.activeVar)) {
            servicesObject[key] = {
              name: value.name,
              complete: this.$store.state.Application.pageCompleteness.components.objectives[key],
              errors: this.$store.state.Application.errorList.components.objectives[key],
              path: value.path,
            };
          }
        });
        return servicesObject;
      },
      componentObjectiveErrorExists() {
        let errorsTF = false;
        Object.values(this.activeServicesObject()).forEach((item) => {
          if (item.complete !== true) {
            errorsTF = true;
          }
        });
        return errorsTF;
      },

      // components
      isActive(list) {
        if (list.length === 0) {
          return true;
        }
        let activeTF = false;
        list.forEach((item) => {
          if (this.$store.state.Project[item]) {
            activeTF = true;
          }
        });
        return activeTF;
      },
      notStartedText(item) {
        if (item === null) {
          return NOT_STARTED;
        }
        return '';
      },

      // financial components
      activeFinancesObject() {
        const financesObject = {};
        Object.entries(FINANCE_COMPONENTS_MAPPING).forEach(([key, value]) => {
          if (this.isActive(value.activeVar)) {
            financesObject[key] = {
              name: value.name,
              complete: this.$store.state.Application.pageCompleteness.components.financial[key],
              errors: this.$store.state.Application.errorList.components.financial[key],
              path: value.path,
            };
          }
        });
        return financesObject;
      },
      componentFinancialErrorExists() {
        let errorsTF = false;
        Object.values(this.activeFinancesObject()).forEach((item) => {
          if (item.complete !== true) {
            errorsTF = true;
          }
        });
        return errorsTF;
      },

      // technology components
      techAll() {
        const techList = [this.techGen, this.techIR, this.techESS];
        return flatten(techList);
      },
      getTechDisplayName(tech) {
        if (tech.complete === null) {
          return NOT_STARTED;
        } else if (!tech.name) {
          return ': Undefined';
        }
        return `: ${tech.name}`;
      },
      componentTechErrorExists() {
        let errorsTF = false;
        Object.values(this.techAll()).forEach((tech) => {
          if (tech.complete !== true) {
            errorsTF = true;
          }
        });
        return errorsTF;
      },
      getTechPath(tech) {
        const techTag = tech.tag;
        const techID = tech.id;
        let techPath = '';
        if (techTag === 'PV') {
          techPath = paths.TECH_SPECS_PV_PATH;
        } else if (techTag === 'Battery') {
          techPath = paths.TECH_SPECS_BATTERY_PATH;
        } else if (techTag === 'ICE') {
          techPath = paths.TECH_SPECS_ICE_PATH;
        } else if (techTag === 'DieselGen') {
          techPath = paths.TECH_SPECS_DIESEL_PATH;
        }
        return `${techPath}/${techID}`;
      },

      // wizard overview
      overviewAll() {
        const overviewObject = {};
        const overviewList = ['start', 'objectives', 'technologySpecs'];
        overviewList.forEach((item) => {
          overviewObject[item] = {
            name: this.getOverviewDisplayName(item),
            complete: this.$store.state.Application.pageCompleteness.overview[item],
            errors: this.$store.state.Application.errorList.overview[item],
            path: this.getOverviewPath(item),
          };
        });
        return overviewObject;
      },
      overviewErrorExists() {
        let errorsTF = false;
        Object.values(this.overviewAll()).forEach((item) => {
          if (item.complete !== true) {
            errorsTF = true;
          }
        });
        return errorsTF;
      },
      getOverviewPath(page) {
        let overviewPath = '';
        if (page === 'start') {
          overviewPath = paths.START_PROJECT_PATH;
        } else if (page === 'objectives') {
          overviewPath = paths.OBJECTIVES_PATH;
        } else if (page === 'technologySpecs') {
          overviewPath = paths.TECH_SPECS_PATH;
        }
        return overviewPath;
      },
      getOverviewDisplayName(page) {
        let overviewName = '';
        if (page === 'start') {
          overviewName = 'Project Configuration';
        } else if (page === 'objectives') {
          overviewName = 'Services';
        } else if (page === 'technologySpecs') {
          overviewName = 'Technology Specifications';
        }
        if (this.notStartedText(this.$store.state.Application.pageCompleteness.overview[page])) {
          return `${overviewName}${NOT_STARTED}`;
        }
        return overviewName;
      },
    },
    data() {
      return {
        paths,
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
        activeServices: this.$store.state.Project.listOfActiveServices,
        // pageC: this.$store.state.Application.pageCompleteness,
        finances: [
          ['Discount rate', this.getRateDisplay(this.$store.state.Project.financeDiscountRate)],
          ['Inflation rate', this.getRateDisplay(this.$store.state.Project.financeInflationRate)],
          ['Federal tax rate', this.getRateDisplay(this.$store.state.Project.financeFederalTaxRate)],
          ['State tax rate', this.getRateDisplay(this.$store.state.Project.financeStateTaxRate)],
          ['Property tax rate', this.getRateDisplay(this.$store.state.Project.financePropertyTaxRate)],
        ],
        scenario: [
          ['FIXME Number of Scenario Analysis Cases', 'Baseline'],
        ],
      };
    },
  };
</script>
