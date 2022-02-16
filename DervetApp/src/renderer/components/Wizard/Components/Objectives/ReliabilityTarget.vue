<template>
  <div>
    <h3>Services: Reliability</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <radio-button-input v-model="reliabilityPostOptimizationOnly"
                          :metadata="metadata.reliabilityPostOptimizationOnly"
                          :isInvalid="submitted && $v.reliabilityPostOptimizationOnly.$error"
                          :errorMessage="getErrorMsg('reliabilityPostOptimizationOnly')">
      </radio-button-input>

      <text-input v-model="reliabilityTarget"
                  v-if="reliabilityPostOptimizationOnly === false"
                  :metadata="metadata.reliabilityTarget"
                  :isInvalid="submitted && $v.reliabilityTarget.$error"
                  :errorMessage="getErrorMsg('reliabilityTarget')">
      </text-input>

      <text-input v-model="reliabilityMaxOutageDuration"
                  :metadata="metadata.reliabilityMaxOutageDuration"
                  :isInvalid="submitted && $v.reliabilityMaxOutageDuration.$error"
                  :errorMessage="getErrorMsg('reliabilityMaxOutageDuration')">
      </text-input>

      <hr>

      <time-series-upload
        :chartKey="chartKey"
        :data="tsCriticalLoad"
        :metadata="metadata.tsCriticalLoad"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsCriticalLoad"
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
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import CollectionTypes from '@/models/Project/CollectionTypes';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionTypes.Project, Page.ObjectivesReliabilityTarget);
    },
    validations() {
      return {
        ...this.validationSchema,
        reliabilityTarget: {
          ...this.validationSchema.reliabilityTarget,
          required: requiredIf(function isReliabilityTargetRequired() {
            return (this.reliabilityPostOptimizationOnly === false);
          }),
        },
      };
    },
    methods: {
      resetAllNonRequired() {
        if (this.reliabilityPostOptimizationOnly === true) {
          this.resetNonRequired(['reliabilityTarget']);
        }
      },
      validatedSave() {
        this.resetAllNonRequired();
        wizardFormMixin.methods.validatedSave.bind(this)();
      },
    },
  };
</script>
