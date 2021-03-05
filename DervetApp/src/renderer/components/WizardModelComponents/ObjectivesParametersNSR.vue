<template>
  <div>
    <h3>Services: Spinning Reserve Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="nsrGrowth"
                  v-bind:field="metadata.nsrGrowth"
                  :isInvalid="submitted && $v.nsrGrowth.$error"
                  :errorMessage="getErrorMsg('nsrGrowth')">
      </text-input>

      <text-input v-model="nsrDuration"
                  v-bind:field="metadata.nsrDuration"
                  :isInvalid="submitted && $v.nsrDuration.$error"
                  :errorMessage="getErrorMsg('nsrDuration')">
      </text-input>

      <timeseries-data-upload
        chart-name="tsNsrPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsNsrPrice').data.length !== 0"
        :DataModel="metadata.tsNsrPrice.DataModel"
        :data-name="metadata.tsNsrPrice.displayName"
        :data-time-series="tsData('tsNsrPrice')"
        :errorMessage="getErrorMsgTS('tsNsrPrice')"
        :isInvalid="submitted && tsData('tsNsrPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsNsrPrice')"
        object-name="tsNsrPrice"
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
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import { projectMetadata } from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'NSR';
  const FIELDS = c.NSR_FIELDS;
  const TS_FIELDS = c.TS_NSR_FIELDS;

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
    },
    methods: {
      getErrorListTS() {
        const errors = [];
        (TS_FIELDS).forEach((tsField) => {
          const errorMsgTS = this.getErrorMsgTSFromProject(tsField);
          if (errorMsgTS.length !== 0) {
            errors.push(errorMsgTS);
          }
        });
        return errors;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
    },
  };
</script>
