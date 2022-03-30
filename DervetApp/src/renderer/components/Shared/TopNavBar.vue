<template>
  <div class="text-center">
    <b-navbar toggleable="md" fixed="top" type="dark" variant="dark">
      <b-navbar-brand :active="isActiveIndexOrAbout()"
                      :to="INDEX" class="text-xs-left">
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
            <b-button
              v-if="!isActiveIndexOrAbout() && !runInProgress()"
              @click="runDervetDisabled ? cannotRun() : runDervet()"
              class="btn navbar-btn text-center"
              type="submit"
              size="md"
              variant="success">
              <span class="fas fa-play fa-md"/>
            </b-button>
            <b-button
              v-if="runInProgress()"
              @click="killDervet()"
              class="btn btn-danger navbar-btn"
              type="submit"
              size="md">
              <span class="fas fa-stop fa-md"/>
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
  import * as paths from '@/router/constants';
  import somePageHasError from '@/util/page';
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
  import pagesMixin from '@/mixins/pagesMixin';
  import * as a from '@/store/actionTypes';

  const FORUM_LINK = 'https://www.der-vet.com/forum/';
  const USER_GUIDE_LINK = 'https://storagewiki.epri.com/index.php/DER_VET_User_Guide#Index';

  export default {
    mixins: [pagesMixin],
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
      runDervetDisabled() {
        return somePageHasError(this.overviewPages) || somePageHasError(this.technologyItemsFlattened)
          || somePageHasError(this.objectives) || somePageHasError(this.financial);
      },
    },
    methods: {
      goToIndex() {
        this.$router.push({ path: INDEX });
      },
      isActiveIndexOrAbout() {
        return this.$route.path === INDEX || this.$route.path === '/about';
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
        this.$store.dispatch(`Results/${a.RESET}`)
          .then(this.$store.dispatch(`Application/${a.RUN_DERVET}`, this.$store.state.Project))
          .then(this.$router.push({ path: RUN_ANALYSIS })).catch(() => {});
      },
      killDervet() {
        this.$store.dispatch(`Application/${a.KILL_PYTHON}`, this.$store.state.Project)
          .then(this.$router.push({ path: WIZARD_RUN_CASE }).catch(() => {}));
      },
      cannotRun() {
        this.$router.push({ path: WIZARD_RUN_CASE }).catch(() => {});
      },
    },
  };
</script>

