<template>
  <div class="text-center">
    <b-navbar toggleable="lg" fixed="top" type="dark" variant="dark">
      <b-navbar-brand :active="isActiveIndex()"
                      :to="INDEX" class="col-md-2 no-padding">
        <img class="nav-logo-img" :src="FullLogo" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- TODO add disabled attribute to show/hide buttons based on the state of the project -->
          <b-nav-item :active="isActive(WIZARD_OVERVIEW)"
                      :to="WIZARD_OVERVIEW">
            Project Overview
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_COMPONENT)"
                      :to="WIZARD_COMPONENT">
            Model Components
          </b-nav-item>
          <b-nav-item :active="isActive(WIZARD_RUN_CASE)"
                      :to="WIZARD_RUN_CASE">
            Summary
          </b-nav-item>
          <b-nav-item :active="isActive(RESULTS)"
                      :to="RESULTS"
                      v-if="resultsExist">
            Results
          </b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button-group class="navbar-btn">
            <b-button size="lg" variant="success" class="btn navbar-btn text-center" type="submit"
              @click="(runDervetDisabled) ? cannotRun() : runDervet()" v-if="!isActiveIndex() && !runInProgress()">
              <span class="fas fa-play fa-lg"/>
              <!-- <span v-if="!runInProgress()" class="fas fa-spinner fa-spin fa-lg"/> -->
            </b-button>
            <b-button size="lg" v-if="runInProgress()" class="btn btn-danger navbar-btn" type="submit"
              @click="killDervet()">
              <span class="fas fa-stop fa-lg"/>
            </b-button>
          </b-button-group>
          <b-nav-item align="right" link-classes="navbar-top-svg-item">
            <span @click="(e) => openWebsiteInBrowser(e, FORUM_LINK)" class="fas fa-comment-alt"/>
          </b-nav-item>
          <b-nav-item align="right" link-classes="navbar-top-svg-item">
            <span @click="(e) => openWebsiteInBrowser(e, USER_GUIDE_LINK)" class="fas fa-question-circle"/>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
  import _ from 'lodash';
  import * as paths from '@/router/constants';
  import {
    INDEX,
    WIZARD_OVERVIEW,
    WIZARD_COMPONENT,
    RESULTS,
    WIZARD_RUN_CASE,
    RUN_ANALYSIS,
  } from '@/router/constants';
  import FullLogo from '@/assets/FullLogoWhiteText.png';
  import openWebsiteInBrowser from '@/util/browser';
  import technologySpecsMixin from '@/mixins/technologySpecsMixin';
  import objectivesMixin from '@/mixins/objectivesMixin';
  import financeMixin from '@/mixins/financeMixin';

  const FORUM_LINK = 'https://www.der-vet.com/forum/';
  const USER_GUIDE_LINK = 'https://storagewiki.epri.com/index.php/DER_VET_User_Guide#Index';

  export default {
    mixins: [technologySpecsMixin, objectivesMixin, financeMixin],
    data() {
      return {
        INDEX,
        FORUM_LINK,
        USER_GUIDE_LINK,
        WIZARD_OVERVIEW,
        WIZARD_COMPONENT,
        RESULTS,
        WIZARD_RUN_CASE,
        openWebsiteInBrowser,
        FullLogo,
        paths,
      };
    },
    computed: {
      resultsExist() {
        return this.$store.state.Results.data !== null;
      },
      activeFinancal() {
        return this.filterActive(this.financial);
      },
      activeFinancialAndErrorsOnly() {
        return this.errorsOnly(this.activeFinancal);
      },
      doesActiveFinancialErrorExist() {
        return this.activeFinancialAndErrorsOnly.length > 0;
      },
      activeObjectives() {
        return this.filterActive(this.objectives);
      },
      activeObjectivesAndErrorsOnly() {
        return this.errorsOnly(this.activeObjectives);
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
    methods: {
      filterActive(listOfObjects) {
        return _.filter(listOfObjects, 'show');
      },
      errorsOnly(listOfObjects) {
        const pageWithErrors = _.filter(listOfObjects, ['isComplete', false]);
        return pageWithErrors;
      },
      goToIndex() {
        this.$router.push({ path: INDEX });
      },
      isActiveIndex() {
        return this.$route.path === INDEX;
      },
      isActive(path) {
        return new RegExp(path).test(this.$route.path);
      },
      runInProgress() {
        return this.$store.state.Application.runInProgress;
      },
      runDervet() {
        // TODO: note that there is currently no validation, so calling this with an
        // incomplete Project object will likely result in an unhandled exception
        this.$store.dispatch('Application/runDervet', this.$store.state.Project)
          .then(this.$router.push({ path: RUN_ANALYSIS }).catch(() => {}));
      },
      killDervet() {
        this.$store.dispatch('Application/killPython', this.$store.state.Project)
          .then(this.$router.push({ path: WIZARD_RUN_CASE }).catch(() => {}));
      },
      cannotRun() {
        this.$router.push({ path: WIZARD_RUN_CASE }).catch(() => {});
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
          overviewPath = paths.PROJECT_CONFIGURATION;
        } else if (page === 'objectives') {
          overviewPath = paths.OBJECTIVES;
        } else if (page === 'technologySpecs') {
          overviewPath = paths.TECH_SPECS;
        }
        return overviewPath;
      },
    },
  };
</script>

