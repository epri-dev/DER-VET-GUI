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
                     v-on:click.native="resetProjectToDefault()">
          Start a New Analysis
        </router-link>
        <p class="tool-tip-index">
          Create a new custom case analysis.
        </p>
      </div>
      <div class="col-md-4 text-center">
        <router-link to="/import-project"
                     class="btn btn-lg btn-info btn-index-page">
          Use Existing Analysis
        </router-link>
        <p class="tool-tip-index">
          Load a previously-created case analysis.
        </p>
      </div>
      <div class="col-md-4 text-center">
        <b-dropdown text="Pre-Defined Analyses"
                    toggle-class="btn btn-lg btn-light btn-quick-start btn-index-page">
          <b-dropdown-item v-for="option in useCases" v-bind:key="option.id"
                           v-on:click.native="loadQuickStartProject(option.value)">
            {{option.text}}
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
          DER-VET<sup>TM</sup> provides a free, publicly accessible, open-source platform for calculating, understanding, and optimizing the value of distributed energy resources (DER) based on their technical merits and constraints. An extension of EPRI's StorageVET<span>&#174;</span> tool, DER-VET supports site-specific assessments of energy storage and additional DER technologies—including solar, wind, demand response, electric vehicle charging, internal combustion engines, and combined heat and power—in different configurations, such as microgrids. It uses load and other data to determine optimal size, duration, and other characteristics for maximizing benefits based on site conditions and the value that can be extracted from targeted use cases. Customers, developers, utilities, and regulators across the industry can apply this tool to inform project-level decisions based on sound technical understanding and unbiased cost-performance data.
        </p>
        <p class="tool-tip-index tool-tip-index-col">
          DER-VET was developed with funding from the California Energy Commission. EPRI plans to support continuing updates and enhancements.
        </p>
      </div>
    </div>
  </div>


</template>

<script language="ts">
  import FullLogo from '@/assets/FullLogo.png';
  import EPRILogo from '@/assets/EPRILogo.png';
  import { LOAD_QUICK_START_PROJECT } from '@/store/actionTypes';
  import { WIZARD_OVERVIEW, SUMMARY } from '@/router/constants';
  import * as a from '@/store/actionTypes';

  const useCases = [
    { id: 1, value: 'billReductionProject', text: 'DER for Bill Reduction' },
    { id: 2, value: 'reliabilityProject', text: 'DER for Reliability' },
    { id: 3, value: 'ERCOTMarketService', text: 'ERCOT Market Case' },
    { id: 4, value: 'dummyMarketServiceHourly', text: 'Dummy Market Case' },
  ];

  export default {
    name: 'index',
    data() {
      return {
        WIZARD_OVERVIEW,
        selectedUseCase: null,
        useCases,
        EPRILogo,
        FullLogo,
      };
    },
    computed: {
      projID() {
        return this.$store.state.Project.id;
      },
    },
    methods: {
      loadQuickStartProject(selectedUseCase) {
        this.$store.dispatch('resetProjectToDefault')
          .then(this.$store.dispatch('resetResultToDefault', this.$store.state.Project.id))
          .then(this.$store.dispatch(`Application/${a.RESET_APPLICATION_TO_DEFAULT}`, this.$store.state.Project.id))
          .then(this.$store.dispatch('resetZipCode'))
          .then(this.$store.dispatch(LOAD_QUICK_START_PROJECT, selectedUseCase))
          .then(this.$store.dispatch('Application/setQuickStartCompleteness'))
          .then(this.$store.dispatch(`Application/${a.SET_QUICK_START_ERROR_LIST}`, selectedUseCase))
          .then(this.$router.push({ path: SUMMARY }));
      },
      resetProjectToDefault() {
        this.$store.dispatch('resetProjectToDefault')
          .then(this.$store.dispatch('resetResultToDefault', this.$store.state.Project.id))
          .then(this.$store.dispatch(`Application/${a.RESET_APPLICATION_TO_DEFAULT}`, this.$store.state.Project.id))
          .then(this.$store.dispatch('resetZipCode'))
          .then(this.$router.push({ path: WIZARD_OVERVIEW }));
      },
    },
  };
</script>
