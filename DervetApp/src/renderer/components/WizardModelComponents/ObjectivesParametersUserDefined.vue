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
        chart-name="tsUserPowerExportMaxChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsUserPowerExportMax.DataModel"
        :data-name="metadata.tsUserPowerExportMax.displayName"
        :data-time-series="tsData('tsUserPowerExportMax')"
        :errorMessage="getErrorMsgTS('tsUserPowerExportMax')"
        :isInvalid="submitted && tsData('tsUserPowerExportMax').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserPowerExportMax')"
        object-name="tsUserPowerExportMax"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserPowerExportMinChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsUserPowerExportMin.DataModel"
        :data-name="metadata.tsUserPowerExportMin.displayName"
        :data-time-series="tsData('tsUserPowerExportMin')"
        :errorMessage="getErrorMsgTS('tsUserPowerExportMin')"
        :isInvalid="submitted && tsData('tsUserPowerExportMin').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserPowerExportMin')"
        object-name="tsUserPowerExportMin"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserPowerImportMaxChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsUserPowerImportMax.DataModel"
        :data-name="metadata.tsUserPowerImportMax.displayName"
        :data-time-series="tsData('tsUserPowerImportMax')"
        :errorMessage="getErrorMsgTS('tsUserPowerImportMax')"
        :isInvalid="submitted && tsData('tsUserPowerImportMax').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserPowerImportMax')"
        object-name="tsUserPowerImportMax"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserPowerImportMinChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsUserPowerImportMin.DataModel"
        :data-name="metadata.tsUserPowerImportMin.displayName"
        :data-time-series="tsData('tsUserPowerImportMin')"
        :errorMessage="getErrorMsgTS('tsUserPowerImportMin')"
        :isInvalid="submitted && tsData('tsUserPowerImportMin').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserPowerImportMin')"
        object-name="tsUserPowerImportMin"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserEnergyMaxChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsUserEnergyMax.DataModel"
        :data-name="metadata.tsUserEnergyMax.displayName"
        :data-time-series="tsData('tsUserEnergyMax')"
        :errorMessage="getErrorMsgTS('tsUserEnergyMax')"
        :isInvalid="submitted && tsData('tsUserEnergyMax').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserEnergyMax')"
        object-name="tsUserEnergyMax"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsUserEnergyMinChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsUserEnergyMin.DataModel"
        :data-name="metadata.tsUserEnergyMin.displayName"
        :data-time-series="tsData('tsUserEnergyMin')"
        :errorMessage="getErrorMsgTS('tsUserEnergyMin')"
        :isInvalid="submitted && tsData('tsUserEnergyMin').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsUserEnergyMin')"
        object-name="tsUserEnergyMin"
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
  import '@/assets/samples/Sample_UserPowerExportMax_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserPowerExportMax_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_UserPowerExportMin_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserPowerExportMin_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_UserPowerImportMax_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserPowerImportMax_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_UserPowerImportMin_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_UserPowerImportMin_TimeSeries_8784.csv';

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
    },
  };
</script>
