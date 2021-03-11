<template>
  <div>
    <h3>Services: System Information</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <timeseries-data-upload
        chart-name="tsSystemLoadChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsSystemLoad').data.length !== 0"
        :DataModel="metadata.tsSystemLoad.DataModel"
        :data-name="metadata.tsSystemLoad.displayName"
        :data-time-series="tsData('tsSystemLoad')"
        :errorMessage="getErrorMsgTS('tsSystemLoad')"
        :isInvalid="submitted && tsData('tsSystemLoad').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsSystemLoad')"
        object-name="tsSystemLoad"
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
  import '@/assets/samples/Sample_SystemLoad_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_SystemLoad_TimeSeries_8784.csv';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'systemInformation';
  const FIELDS = [];
  const TS_FIELDS = [...c.TS_SYSTEM_FIELDS];

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
          // skip non-required tsFields
          const errorMsgTS = this.getErrorMsgTSFromProject(tsField);
          if (errorMsgTS.length !== 0) {
            errors.push(errorMsgTS);
          }
        });
        return errors;
      },
    },
  };
</script>
