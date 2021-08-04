<template>
  <div class="container body-content">

    <div class="jumbotron dervet-title">
      <img class="logo-img" :src="FullLogo" />
      <img class="epri-logo-img" :src="EPRILogo" />
      <h5>EPRI's Distributed Energy Resource Value Estimation Tool (DER-VET<sup>TM</sup>)</h5>
    </div>

    <div class="row buffer-bottom">
      <div class="col-md-4 text-center">
        <router-link :to="$route.path"
                     class="btn btn-lg btn-warning btn-index-page text-white"
                     v-on:click.native="startNewProject()">
          Start a New Analysis
        </router-link>
        <p class="tool-tip-index">
          Create a new custom case analysis.
        </p>
      </div>

      <div class="col-md-4 text-center">
        <router-link :to="IMPORT_PROJECT"
                     class="btn btn-lg btn-info btn-index-page">
          Use Existing Analysis
        </router-link>
        <p class="tool-tip-index">
          Load a previously-created case analysis.
        </p>
      </div>

      <div class="col-md-4 text-center">
        <b-dropdown toggle-class="btn btn-lg btn-light btn-quick-start btn-index-page" :no-caret="isLoading">
          <template #button-content>
            <span v-if="!isLoading">Pre-Defined Analyses</span>
            <div
              v-else
              class="spinner-border text-light"
              role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </template>
          <b-dropdown-item
            v-for="useCase, idx in USE_CASE_CONFIGS"
            v-bind:key="idx"
            v-on:click.native="loadUseCaseProject(useCase)">
            {{useCase.displayText}}
          </b-dropdown-item>
        </b-dropdown>
        <p class="tool-tip-index">
          Load a pre-defined case analysis.
        </p>
      </div>
    </div>

    <hr>
    <div class="row">
      <div class="col-md-12">
          <p class="tool-tip-index tool-tip-index-col">
              DER-VET<sup>TM</sup> provides a free, publicly accessible, open-source platform for calculating, understanding, and optimizing the value of distributed energy resources (DER)
              based on their technical merits and constraints. An extension of EPRI's StorageVET<span>&#174;</span> tool, DER-VET supports site-specific assessments of energy storage and additional DER technologies—including solar, wind, demand response, electric vehicle charging, internal combustion engines, and combined heat and power—in different configurations, such as microgrids. It uses load and other data to determine optimal size, duration, and other characteristics for maximizing benefits based on site conditions and the value that can be extracted from targeted use cases. Customers, developers, utilities, and regulators across the industry can apply this tool to inform project-level decisions based on sound technical understanding and unbiased cost-performance data.
          </p>
          <p class="tool-tip-index tool-tip-index-col">
              DER-VET was developed with funding from the California Energy Commission. EPRI plans to support continuing updates and enhancements.
          </p>
      </div>
      <div class="col-md-12">
        <router-link to="/about">
          <p class="tool-tip-index tool-tip-index-col">
            About this Application.
          </p>
        </router-link>
      </div>
    </div>
  </div>


</template>

<script language="ts">
  import FullLogo from '@/assets/FullLogo.png';
  import EPRILogo from '@/assets/EPRILogo.png';
  import loadExistingProjectMixin from '@/mixins/loadExistingProjectMixin';
  import { IMPORT_PROJECT, WIZARD_OVERVIEW } from '@/router/constants';
  import { USE_CASE_CONFIGS } from '@/models/Project/UseCaseConfig';
  import * as a from '@/store/actionTypes';

  export default {
    name: 'index',
    mixins: [loadExistingProjectMixin],
    data() {
      return {
        EPRILogo,
        FullLogo,
        isLoading: false,
        selectedUseCase: null,
        USE_CASE_CONFIGS,
        IMPORT_PROJECT,
      };
    },
    methods: {
      loadUseCaseProject(useCase) {
        this.isLoading = true;
        this.loadExistingProject(useCase.getFullDirectory())
          .finally(() => { this.isLoading = false; });
      },
      startNewProject() {
        this.$store.dispatch(a.RESET_ALL)
          .then(this.$router.push({ path: WIZARD_OVERVIEW }));
      },
    },
  };
</script>
