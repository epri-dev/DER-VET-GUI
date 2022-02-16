<template>
  <div>
    <h3>Services: Resource Adequacy</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="raNumberEvents"
                  :metadata="metadata.raNumberEvents"
                  :isInvalid="submitted && $v.raNumberEvents.$error"
                  :errorMessage="getErrorMsg('raNumberEvents')">
      </text-input>

      <text-input v-model="raEventLength"
                  :metadata="metadata.raEventLength"
                  :isInvalid="submitted && $v.raEventLength.$error"
                  :errorMessage="getErrorMsg('raEventLength')">
      </text-input>

      <radio-button-input
        v-model="raDispatchMode"
        :metadata="metadata.raDispatchMode"
        :isInvalid="submitted && $v.raDispatchMode.$error"
        :errorMessage="getErrorMsg('raDispatchMode')">
      </radio-button-input>

      <radio-button-input
        v-model="raEventSelectionMethod"
        :metadata="metadata.raEventSelectionMethod"
        :isInvalid="submitted && $v.raEventSelectionMethod.$error"
        :errorMessage="getErrorMsg('raEventSelectionMethod')">
      </radio-button-input>

      <text-input v-model="raGrowth"
                  :metadata="metadata.raGrowth"
                  :isInvalid="submitted && $v.raGrowth.$error"
                  :errorMessage="getErrorMsg('raGrowth')">
      </text-input>

      <time-series-upload
        :chartKey="chartKey"
        :data="mtsRaCapacityPrice"
        :metadata="metadata.mtsRaCapacityPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.mtsRaCapacityPrice"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsRaActive"
        :metadata="metadata.tsRaActive"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsRaActive"
        @data="setData"
        v-if="raEventSelectionMethod === 'Peak by Month with Active Hours'"
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
  import CollectionTypes from '@/models/Project/CollectionTypes';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionTypes.Project, Page.ObjectivesRA);
    },
  };
</script>
