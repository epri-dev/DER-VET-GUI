<template>
  <div>
    <h3>Services: Non-Spinning Reserve Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <text-input v-model="nsrGrowth"
                  :metadata="metadata.nsrGrowth"
                  :isInvalid="submitted && $v.nsrGrowth.$error"
                  :errorMessage="getErrorMsg('nsrGrowth')">
      </text-input>

      <text-input v-model="nsrDuration"
                  :metadata="metadata.nsrDuration"
                  :isInvalid="submitted && $v.nsrDuration.$error"
                  :errorMessage="getErrorMsg('nsrDuration')">
      </text-input>

      <hr>

      <time-series-upload
        :chartKey="chartKey"
        :data="tsNsrPrice"
        :metadata="metadata.tsNsrPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsNsrPrice"
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
  import CollectionTypes from '@/models/Project/CollectionTypes';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionTypes.Project, Page.ObjectivesNSR);
    },
  };
</script>
