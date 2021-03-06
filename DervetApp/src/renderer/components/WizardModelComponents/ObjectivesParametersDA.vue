<template>
  <div>
    <h3>Services: Day Ahead Energy Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="daGrowth"
                  v-bind:field="metadata.daGrowth"
                  :isInvalid="submitted && $v.daGrowth.$error"
                  :errorMessage="getErrorMsg('daGrowth')">
      </text-input>

      <timeseries-data-upload
        chart-name="tsDaPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsDaPrice').data.length !== 0"
        :DataModel="metadata.tsDaPrice.DataModel"
        :data-name="metadata.tsDaPrice.displayName"
        :data-time-series="tsData('tsDaPrice')"
        :errorMessage="getErrorMsgTS('tsDaPrice')"
        :isInvalid="submitted && tsData('tsDaPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsDaPrice')"
        object-name="tsDaPrice"
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
  const PAGE = 'DA';
  const FIELDS = c.DA_FIELDS;
  const TS_FIELDS = c.TS_DA_FIELDS;

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
