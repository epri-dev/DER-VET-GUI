<template>
  <div class="form-horizontal form-buffer">
    <h3>CalEnviroScreen</h3>

    <!-- TODO have someone improve this text (specifically the part explaining why it is included) -->
    <div class="row">
      <div class="col-md-12">
        CalEnviroScreen is a mapping tool that helps identify California communities that are most affected by many sources of pollution, and where people are often especially vulnerable to pollution’s effects. It uses environmental, health, and socioeconomic information to produce scores for every census tract in the state. To find the approximate impact of your project, enter your zip code below. For more information, please visit <a class="text-decoration-none" @click="e => openCesWebsiteInBrowser(e)" href=''>CalEnviroScreen homepage</a>.
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

    <div v-else-if="showNoScoresFoundMessage" class="row">
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
</template>

<script>
  import { shell } from 'electron'; // eslint-disable-line

  import CesMap from '@/assets/CalEnviroScreen/CesMap.png';
  import CesScoresTable from '@/components/CalEnviroScreen/CesScoresTable';
  import ZipCodeFilter from '@/components/CalEnviroScreen/ZipCodeFilter';
  import InnerImageZoom from 'vue-inner-image-zoom';


  export default {
    name: 'CalEnviroScreen',
    components: {
      CesScoresTable,
      InnerImageZoom,
      ZipCodeFilter,
    },
    computed: {
      cesScores() {
        return this.$store.getters.getCesScoresByZipCode(this.zipCode);
      },
      showCesScoresTable() {
        return this.zipCode !== null && this.cesScores.length > 0;
      },
      showNoScoresFoundMessage() {
        return this.zipCode !== null && this.cesScores.length === 0;
      },
    },
    data() {
      return {
        CesMap,
        errorMessage: null,
        zipCode: this.$store.state.CalEnviroScreen.zipCode,
      };
    },
    methods: {
      onClickGo(zipCode) {
        this.zipCode = parseFloat(zipCode);
        this.$store.dispatch('setZipCode', this.zipCode)
          .then(() => {
            if (this.showNoScoresFoundMessage) {
              this.errorMessage = `No CES scores found for zip code ${this.zipCode}.`;
            }
          });
      },
      openCesWebsiteInBrowser(e) {
        e.preventDefault();
        shell.openExternal('https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-30');
      },
      setErrorMessage(message) {
        this.errorMessage = message;
      },
    },
  };
</script>
