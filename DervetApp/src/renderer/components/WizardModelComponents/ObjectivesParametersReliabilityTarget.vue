<template>
  <div>
    <h3>Services: Reliability</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <radio-button-input v-model="reliabilityPostOptimizationOnly"
                          v-bind:field="metadata.reliabilityPostOptimizationOnly"
                          :isInvalid="submitted && $v.reliabilityPostOptimizationOnly.$error"
                          :errorMessage="getErrorMsg('reliabilityPostOptimizationOnly')">
      </radio-button-input>

      <text-input v-model="reliabilityTarget"
                  v-if="reliabilityPostOptimizationOnly === false"
                  v-bind:field="metadata.reliabilityTarget"
                  :isInvalid="submitted && $v.reliabilityTarget.$error"
                  :errorMessage="getErrorMsg('reliabilityTarget')">
      </text-input>

      <text-input v-model="reliabilityMaxOutageDuration"
                  v-bind:field="metadata.reliabilityMaxOutageDuration"
                  :isInvalid="submitted && $v.reliabilityMaxOutageDuration.$error"
                  :errorMessage="getErrorMsg('reliabilityMaxOutageDuration')">
      </text-input>

      <timeseries-data-upload
        chart-name="tsCriticalLoadChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsCriticalLoad.DataModel"
        :data-name="metadata.tsCriticalLoad.displayName"
        :data-time-series="tsData('tsCriticalLoad')"
        :errorMessage="getErrorMsgTS('tsCriticalLoad')"
        :isInvalid="submitted && tsData('tsCriticalLoad').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsCriticalLoad')"
        object-name="tsCriticalLoad"
        @uploaded="receiveTimeseriesData"
      />
      <hr>

      <save-and-save-continue
        :displayError="submitted && ($v.$anyError || isTSError)"
        :save="validatedSaveStay"
        :save-continue="validatedSaveContinue"
      />

    </div>
  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import { projectMetadata } from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'resilience';
  const FIELDS = c.RESILIENCE_FIELDS;
  const TS_FIELDS = [...c.TS_RESILIENCE_FIELDS];

  const ALL_FIELDS = [...FIELDS, ...TS_FIELDS];
  const validations = projectMetadata.getValidationSchema(FIELDS);

  const CONSTANTS = {
    DESTINATION_PATH,
    PAGEGROUP,
    PAGEKEY,
    PAGE,
    FIELDS,
    TS_FIELDS,
  };

  export default {
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      return {
        metadata: this.getMetadata(projectMetadata, ALL_FIELDS),
        ...this.getDataFromProject(ALL_FIELDS),
        ...this.getTSInputDefaultDataFromProject(TS_FIELDS),
        ...this.getChildKeys(TS_FIELDS),
        ...this.getUseExistingDefaults(TS_FIELDS),
        CONSTANTS,
      };
    },
    validations: {
      ...validations,
      reliabilityTarget: {
        ...validations.reliabilityTarget,
        required: requiredIf(function isReliabilityTargetRequired() {
          return (this.reliabilityPostOptimizationOnly === false);
        }),
      },
    },
    computed: {
      isRequiredTSFields() {
        // return an object of booleans for every TS_FIELD,
        //   indicating if each is required
        const isRequiredObject = {};
        (TS_FIELDS).forEach((tsField) => {
          isRequiredObject[tsField] = true;
        });
        return isRequiredObject;
      },
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.reliabilityPostOptimizationOnly === true) {
          this.resetNonRequired(['reliabilityTarget']);
        }
        csvUploadMixin.methods.validatedSave.bind(this)();
      },
    },
  };
</script>
