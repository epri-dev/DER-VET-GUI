<template>
  <div>
    <b-navbar fixed="top" type="dark" variant="dark">
      <b-navbar-brand>DER-VET</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- TODO add disabled attribute to show/hide buttons based on the state of the project -->
          <b-nav-item :active="isActiveIndex(INDEX)"
                      :to="INDEX">
            Home
          </b-nav-item>
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
  import {
    INDEX,
    WIZARD_OVERVIEW,
    WIZARD_COMPONENT,
    RESULTS,
    WIZARD_RUN_CASE,
  } from '@/router/constants';

  import openWebsiteInBrowser from '@/util/browser';

  const FORUM_LINK = 'https://www.der-vet.com/forum/';
  const USER_GUIDE_LINK = 'https://storagewikidev.epri.com/index.php/DER_VET_User_Guide#Index';

  export default {
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
      };
    },
    computed: {
      resultsExist() {
        return this.$store.state.Results.data !== null;
      },
    },
    methods: {
      isActiveIndex() {
        return this.$route.path === INDEX;
      },
      isActive(path) {
        return new RegExp(path).test(this.$route.path);
      },
    },
  };
</script>

