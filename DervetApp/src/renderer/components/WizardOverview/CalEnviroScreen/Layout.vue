<template>
  <div class="container body-content">

    <h3>CalEnviroScreen</h3>
    <hr />

    <div class="form-horizontal form-buffer">

      <div class="row">
        <div class="col-md-12">
          CalEnviroScreen is a mapping tool that helps identify California communities that are most affected by many sources of pollution, and where people are often especially vulnerable to pollution’s effects. It uses environmental, health, and socioeconomic information to produce scores for every census tract in the state. To find the approximate impact of your project, enter your zip code below. For more information, please visit the <open-external-link :link="CES_HOMEPAGE_URL" text="CalEnviroScreen homepage."/>
        </div>
      </div>

      <br/>

      <zip-code-filter 
        @goClicked="onClickGo"
        @setErrorMessage="setErrorMessage"
      />
      <div v-if="showCesScoresTable">
        <div class="row">
          <div class="col-md-12">
            CalEnviroScreen scores for the census tracts in zip code <b>{{zipCode}}</b>:
          </div>
        </div>
        <br/>
        <ces-scores-table v-bind:cesScores="cesScores" />
      </div>

      <div v-else-if="showErrorMessage" class="row">
        <div class="col-md-12 error-text-color">
          {{errorMessage}}
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 cal-enviro-screen-img">
           <inner-image-zoom :src="CesMap" :zoomSrc="CesMap" />
        </div>
      </div>
    </div>

    <nav-button :continue-link="WIZARD_COMPONENT" continue-text="Done" :save="this.save" />

  </div>
</template>

<script>
  import CesMap from '@/assets/CalEnviroScreen/CesMap.png';
  import OpenExternalLink from '@/components/Shared/OpenExternalLink';
  import CesScoresTable from '@/components/WizardOverview/CalEnviroScreen/CesScoresTable';
  import ZipCodeFilter from '@/components/WizardOverview/CalEnviroScreen/ZipCodeFilter';
  import { WIZARD_COMPONENT } from '@/router/constants';
  import NavButton from '@/components/Shared/NavButton';
  import InnerImageZoom from 'vue-inner-image-zoom';

  const CES_HOMEPAGE_URL = 'https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-30';

  export default {
    name: 'CalEnviroScreen',
    components: {
      CesScoresTable,
      InnerImageZoom,
      OpenExternalLink,
      ZipCodeFilter,
      NavButton,
    },
    computed: {
      cesScores() {
        // TODO LL use a map getter
        return this.$store.getters['CalEnviroScreen/getCesScoresByZipCode'](this.zipCode);
        // return this.$store.getters.getCesScoresByZipCode(this.zipCode);
      },
      showCesScoresTable() {
        return this.zipCode !== null && this.cesScores.length > 0;
      },
      noScoresFound() {
        return this.zipCode !== null && this.cesScores.length === 0;
      },
      showErrorMessage() {
        return this.errorMessage !== null;
      },
    },
    data() {
      return {
        WIZARD_COMPONENT,
        CesMap,
        CES_HOMEPAGE_URL,
        errorMessage: null,
        zipCode: this.$store.state.CalEnviroScreen.zipCode,
      };
    },
    methods: {
      onClickGo(zipCode) {
        this.zipCode = parseFloat(zipCode);
        this.$store.dispatch('CalEnviroScreen/setZipCode', this.zipCode)
          .then(() => {
            if (this.noScoresFound) {
              this.errorMessage = `No scores found for zip code ${this.zipCode}.`;
            } else {
              this.errorMessage = null;
            }
          });
      },
      setErrorMessage(message) {
        this.zipCode = null;
        this.errorMessage = message;
      },
      save() {
      },
    },
  };
</script>
