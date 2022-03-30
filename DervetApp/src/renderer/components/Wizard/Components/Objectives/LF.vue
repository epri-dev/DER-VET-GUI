<template>
  <div>
    <h3>Services: Load Following</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="lfGrowth"
                  :metadata="metadata.lfGrowth"
                  :isInvalid="submitted && $v.lfGrowth.$error"
                  :errorMessage="getErrorMsg('lfGrowth')">
      </text-input>

      <text-input v-model="lfEnergyPriceGrowth"
                  :metadata="metadata.lfEnergyPriceGrowth"
                  :isInvalid="submitted && $v.lfEnergyPriceGrowth.$error"
                  :errorMessage="getErrorMsg('lfEnergyPriceGrowth')">
      </text-input>

      <text-input v-model="lfDuration"
                  :metadata="metadata.lfDuration"
                  :isInvalid="submitted && $v.lfDuration.$error"
                  :errorMessage="getErrorMsg('lfDuration')">
      </text-input>

      <radio-button-input
        v-model="lfCombinedMarket"
        :metadata="metadata.lfCombinedMarket"
        :isInvalid="submitted && $v.lfCombinedMarket.$error"
        :validationErrorMessage="getErrorMsg('lfCombinedMarket')">
      </radio-button-input>

      <time-series-upload
        :chartKey="chartKey"
        :data="tsLfEOU"
        :metadata="metadata.tsLfEOU"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsLfEOU"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsLfEOD"
        :metadata="metadata.tsLfEOD"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsLfEOD"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsLfPrice"
        :metadata="metadata.tsLfPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsLfPrice"
        @data="setData"
        v-if="lfCombinedMarket === true"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsLfUpPrice"
        :metadata="metadata.tsLfUpPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsLfUpPrice"
        @data="setData"
        v-if="lfCombinedMarket === false"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsLfDownPrice"
        :metadata="metadata.tsLfDownPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsLfDownPrice"
        @data="setData"
        v-if="lfCombinedMarket === false"
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
      return this.getData(CollectionType.Project, Page.ObjectivesLF);
    },
  };
</script>
