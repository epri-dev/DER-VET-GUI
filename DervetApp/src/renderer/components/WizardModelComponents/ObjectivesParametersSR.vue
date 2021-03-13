<template>
  <div>
    <h3>Services: Spinning Reserve Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="srGrowth"
                  v-bind:field="metadata.srGrowth"
                  :isInvalid="submitted && $v.srGrowth.$error"
                  :errorMessage="getErrorMsg('srGrowth')">
      </text-input>

      <text-input v-model="srDuration"
                  v-bind:field="metadata.srDuration"
                  :isInvalid="submitted && $v.srDuration.$error"
                  :errorMessage="getErrorMsg('srDuration')">
      </text-input>

      <timeseries-data-upload
        chart-name="tsSrPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsSrPrice').data.length !== 0"
        :DataModel="metadata.tsSrPrice.DataModel"
        :data-name="metadata.tsSrPrice.displayName"
        :data-time-series="tsData('tsSrPrice')"
        :errorMessage="getErrorMsgTS('tsSrPrice')"
        :isInvalid="submitted && tsData('tsSrPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsSrPrice')"
        object-name="tsSrPrice"
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
  import '@/assets/samples/Sample_SRPrice_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_SRPrice_TimeSeries_8784.csv';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'SR';
  const FIELDS = c.SR_FIELDS;
  const TS_FIELDS = c.TS_SR_FIELDS;

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
