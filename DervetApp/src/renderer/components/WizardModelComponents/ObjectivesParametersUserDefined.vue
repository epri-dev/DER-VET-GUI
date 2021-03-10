<template>
  <div>
    <h3>Services: User-Defined Settings</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="userPrice"
                  v-bind:field="metadata.userPrice"
                  :isInvalid="submitted && $v.userPrice.$error"
                  :errorMessage="getErrorMsg('userPrice')">
      </text-input>

      <timeseries-data-upload
        chart-name="tsUserPowerMaxChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsUserPowerMax').data.length !== 0"
        :DataModel="metadata.tsUserPowerMax.DataModel"
        :data-name="metadata.tsUserPowerMax.displayName"
        :data-time-series="tsData('tsUserPowerMax')"
        :errorMessage="getErrorMsgTS('tsUserPowerMax')"
        :isInvalid="submitted && tsData('tsUserPowerMax').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserPowerMax')"
        object-name="tsUserPowerMax"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserPowerMinChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsUserPowerMin').data.length !== 0"
        :DataModel="metadata.tsUserPowerMin.DataModel"
        :data-name="metadata.tsUserPowerMin.displayName"
        :data-time-series="tsData('tsUserPowerMin')"
        :errorMessage="getErrorMsgTS('tsUserPowerMin')"
        :isInvalid="submitted && tsData('tsUserPowerMin').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserPowerMin')"
        object-name="tsUserPowerMin"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserEnergyMaxChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsUserEnergyMax').data.length !== 0"
        :DataModel="metadata.tsUserEnergyMax.DataModel"
        :data-name="metadata.tsUserEnergyMax.displayName"
        :data-time-series="tsData('tsUserEnergyMax')"
        :errorMessage="getErrorMsgTS('tsUserEnergyMax')"
        :isInvalid="submitted && tsData('tsUserEnergyMax').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserEnergyMax')"
        object-name="tsUserEnergyMax"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserEnergyMinChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsUserEnergyMin').data.length !== 0"
        :DataModel="metadata.tsUserEnergyMin.DataModel"
        :data-name="metadata.tsUserEnergyMin.displayName"
        :data-time-series="tsData('tsUserEnergyMin')"
        :errorMessage="getErrorMsgTS('tsUserEnergyMin')"
        :isInvalid="submitted && tsData('tsUserEnergyMin').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserEnergyMin')"
        object-name="tsUserEnergyMin"
        :show-sample-data="isTSError"
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
  import '@/assets/samples/Sample_UserEnergyMax_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserEnergyMax_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_UserEnergyMin_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserEnergyMin_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_UserPowerMax_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserPowerMax_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_UserPowerMin_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserPowerMin_TimeSeries_8784.csv';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'userDefined';
  const FIELDS = c.USER_DEFINED_FIELDS;
  const TS_FIELDS = c.TS_USER_DEFINED_FIELDS;

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
