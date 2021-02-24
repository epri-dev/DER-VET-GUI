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
                <router-link
                  class="text-decoration-none"
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

        <div v-if="activeTechErrorExists" class="incomplete">
          <h4>Errors in Technology Components</h4>
          <div v-for="techTag in techSpecs">
            <div v-for="techItem in filterNonActives(techTag.items)">
              
              <li>
                <router-link
                  class="text-decoration-none"
                  :to="techPath(techTag.path, techItem)">
                  {{ getTechLabel(techTag.fullName, techItem) }}
                </router-link>
                
                <ul>
                  <li v-for="error in techItem.errorList">
                    <span v-html="error"></span>
                  </li>

                  <div v-if="techItem.associatedInputsComplete === false">
                    <div v-for="associatedInputs in techItem.associatedInputs">
                      <div v-if="!associatedInputs.complete">
                        <li>
                          <router-link
                            class="text-decoration-none"
                            :to="getTechAssociatedInputsPath(techItem)">
                            {{ associatedInputs.displayName + getTechDisplayName(techItem) }}
                          </router-link>
                          <ul>
                            <li v-for="dataError in associatedInputs.errorList">
                              <span v-html="dataError"></span>
                            </li>
                          </ul>
                        </li>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>
            </div>
          </div>
        </div>

        <div v-if="doesActiveObjectivesErrorExist" class="incomplete">
          <h4>Errors in Services Components</h4>
          <div v-for="service in activeObjectivesAndErrorsOnly">
            <div v-if="!service.isComplete">
              <li>
                <router-link class="text-decoration-none"
                             :to="service.path">
                  {{ service.fullName + notStartedText(service.isComplete) }}
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

        <div v-if="doesActiveFinancialErrorExist" class="incomplete">
          <h4>Errors in Finances Components</h4>
          <div v-for="finance in activeFinancialAndErrorsOnly">
            <div v-if="!finance.complete">
              <li>
                <router-link class="text-decoration-none"
                             :to="finance.path">
                  {{ finance.fullName + notStartedText(finance.complete) }}
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
        <ul v-for="techTag in techSpecs" :key="techTag.shortHand">
          <li v-for="techItem in filterNonActives(techTag.items)">
            {{ getTechLabel(techTag.fullName, techItem) }}
          </li>
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

        <div class="form-group form-buffer row">
          <file-picker
            label="Export Project"
            :callback="exportProject"
            :isAsync="true"
            :isDirectory="true"
            buttonAttributes="btn btn-lg btn-info pull-right btn-summary"
            wrapperDivAttributes="col-md-5"/>

          <div class="col-md-2"/>

          <div class="col-md-5">
            <router-link
              v-on:click.native="(runDervetDisabled) ? () => null : runDervet()"
              :event="runDervetDisabled ? '' : 'click'"
              :to="this.$route.path"
              class="btn btn-lg btn-danger pull-left btn-summary">
              {{ runInProgress() ? 'Running Analysis...' : 'Run Analysis' }}
            </router-link>
          </div>
        </div>

      </div>
    </form>

  </div>
</template>

<script>
  import _ from 'lodash';
  import * as paths from '@/router/constants';
  import { RUN_ANALYSIS_PATH } from '@/router/constants';
  import { ANALYSIS_HORIZON_MODE_ALLOWED_VALUES } from '@/models/Project/constants';
  import * as techLabels from '@/models/Project/TechnologySpecs/labelConstants';
  import { exportProject } from '@/service/ProjectFileManager';
  import FilePicker from '@/components/Shared/FilePicker';
  import technologySpecsMixin from '@/mixins/technologySpecsMixin';
  import objectivesMixin from '@/mixins/objectivesMixin';
  import financeMixin from '@/mixins/financeMixin';
  import { isObjectOfLengthZero } from '@/util/logic';

  const NOT_STARTED = ': Not Started';

  export default {
    mixins: [technologySpecsMixin, objectivesMixin, financeMixin],
    computed: {
      activeFinancal() {
        return this.filterActive(this.financial);
      },
      activeFinancialAndErrorsOnly() {
        return this.errorsOnly(this.activeFinancesWithErrors);
      },
      doesActiveFinancialErrorExist() {
        return this.activeFinancialAndErrorsOnly.length > 0;
      },
      activeObjectives() {
        return this.filterActive(this.objectives);
      },
      activeObjectivesAndErrorsOnly() {
        return this.errorsOnly(this.activeObjectivesWithErrors);
      },
      doesActiveObjectivesErrorExist() {
        return this.activeObjectivesAndErrorsOnly.length > 0;
      },
      activeTechErrorExists() {
        let errorsTF = false;
        this.techAll.forEach((tech) => {
          if (tech.complete !== true) {
            errorsTF = true;
          }
        });
        return errorsTF;
      },
      anyErrorExists() {
        return (this.overviewErrorExists() || this.activeTechErrorExists
          || this.doesActiveFinancialErrorExist || this.doesActiveObjectivesErrorExist);
      },
      errorList() {
        return this.$store.state.Application.errorList;
      },
      techAll() {
        const techList = [];
        this.techSpecs.forEach((item) => {
          techList.push(this.filterNonActives(item.items));
        });
        return _.flatten(techList);
      },
      runDervetDisabled() {
        return this.anyErrorExists;
      },
    },
    components: {
      FilePicker,
    },
    methods: {
      filterActive(mixinObject) {
        return _.filter(mixinObject, 'show');
      },
      errorsOnly(activeWithErrorsObject) {
        const hasErrors = function hasErrors(o) {
          return isObjectOfLengthZero(o.errorList);
        };
        const pageWithErrors = _.filter(activeWithErrorsObject, hasErrors);
        return pageWithErrors;
      },
      modeDescription() {
        const mode = this.$store.state.Project.analysisHorizonMode;
        return mode === null ? '' : _.find(ANALYSIS_HORIZON_MODE_ALLOWED_VALUES, { value: mode }).label;
      },
      getAnalysisHorizonDisplay() {
        const horizon = this.$store.state.Project.analysisHorizon;
        return horizon ? `${horizon} years` : '';
      },
      getRateDisplay(rate) {
        if (rate === null) {
          return '';
        }
        return `${rate} %`;
      },
  
      runInProgress() {
        return this.$store.state.Application.runInProgress;
      },
      exportProject(selectedPath) {
        return exportProject(selectedPath, this.$store.state.Project, this.$store.state.Application);
      },
      runDervet() {
        // TODO: note that there is currently no validation, so calling this with an
        // incomplete Project object will likely result in an unhandled exception
        this.$store.dispatch('Application/runDervet', this.$store.state.Project)
          .then(this.$router.push({ path: RUN_ANALYSIS_PATH }));
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
        if (item === null || item === undefined) {
          return NOT_STARTED;
        }
        return '';
      },

      // technology components
      getTechDisplayName(tech) {
        if (tech.complete === null) {
          return NOT_STARTED;
        } if (!tech.name) {
          return ': Undefined';
        }
        return `: ${tech.name}`;
      },
  
      getTechAssociatedInputsPath(tech) {
        const techID = tech.id;
        return `${tech.associatedInputs[0].path}/${techID}`;
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

      // all
  
    },
    data() {
      return {
        techLabels,
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
