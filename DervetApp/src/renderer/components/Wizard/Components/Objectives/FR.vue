<template>
  <div>
    <h3>Services: Frequency Regulation</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="frGrowth"
                  :metadata="metadata.frGrowth"
                  :isInvalid="submitted && $v.frGrowth.$error"
                  :errorMessage="getErrorMsg('frGrowth')">
      </text-input>

      <text-input v-model="frEnergyPriceGrowth"
                  :metadata="metadata.frEnergyPriceGrowth"
                  :isInvalid="submitted && $v.frEnergyPriceGrowth.$error"
                  :errorMessage="getErrorMsg('frEnergyPriceGrowth')">
      </text-input>

      <text-input v-model="frEOU"
                  :metadata="metadata.frEOU"
                  :isInvalid="submitted && $v.frEOU.$error"
                  :errorMessage="getErrorMsg('frEOU')">
      </text-input>

      <text-input v-model="frEOD"
                  :metadata="metadata.frEOD"
                  :isInvalid="submitted && $v.frEOD.$error"
                  :errorMessage="getErrorMsg('frEOD')">
      </text-input>

      <text-input v-model="frDuration"
                  :metadata="metadata.frDuration"
                  :isInvalid="submitted && $v.frDuration.$error"
                  :errorMessage="getErrorMsg('frDuration')">
      </text-input>

      <radio-button-input
        v-model="frCombinedMarket"
        :metadata="metadata.frCombinedMarket"
        :isInvalid="submitted && $v.frCombinedMarket.$error"
        :errorMessage="getErrorMsg('frCombinedMarket')">
      </radio-button-input>

      <hr>

      <time-series-upload
        v-if="frCombinedMarket === true"
        :chartKey="chartKey"
        :data="tsFrPrice"
        :metadata="metadata.tsFrPrice"
        :validationErrorMessage="timeSeriesErrors.tsFrPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        @data="setData"
      />

      <time-series-upload
        v-if="frCombinedMarket === false"
        :chartKey="chartKey"
        :data="tsFrUpPrice"
        :metadata="metadata.tsFrUpPrice"
        :validationErrorMessage="timeSeriesErrors.tsFrUpPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        @data="setData"
      />

      <time-series-upload
        v-if="frCombinedMarket === false"
        :chartKey="chartKey"
        :data="tsFrDownPrice"
        :metadata="metadata.tsFrDownPrice"
        :validationErrorMessage="timeSeriesErrors.tsFrDownPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        @data="setData"
      />

      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
      />

    </div>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionType.Project, Page.ObjectivesFR);
    },
    // TODO need to reset non-required for timeseries depending on frCombinedMarket?
  };
</script>
