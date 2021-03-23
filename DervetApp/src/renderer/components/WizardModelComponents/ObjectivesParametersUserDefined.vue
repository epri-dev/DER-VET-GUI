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

      <div v-if="submitted && isTSError" class="error-text-color">
        <br>
        {{ GENERIC_TS_ERROR_MSG }}
        <br>
      </div>
      <div v-if="submitted && isInfeasible" class="error-text-color">
        <br>
        <span v-html="getInfeasibleErrorMsgs()"></span>
        <br>
      </div>

      <timeseries-data-upload
        chart-name="tsUserPowerExportMaxChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsUserPowerExportMax.DataModel"
        :data-name="metadata.tsUserPowerExportMax.displayName"
        :data-time-series="tsData('tsUserPowerExportMax')"
        :errorMessage="getErrorMsgTS('tsUserPowerExportMax')"
        :isInvalid="false"
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
        :isInvalid="false"
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
        :isInvalid="false"
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
        :isInvalid="false"
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
        :isInvalid="false"
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
        :isInvalid="false"
        @input="receiveUseExisting"
        :key="childKey('tsUserEnergyMin')"
        object-name="tsUserEnergyMin"
        @uploaded="receiveTimeseriesData"
      />
      <hr>

      <save-and-save-continue
        :displayError="submitted && ($v.$anyError || isTSError || isInfeasible)"
        :save="validatedSaveStay"
        :save-continue="validatedSaveContinue"
      />

    </div>
  </div>
</template>

<script>
  import filter from 'lodash/filter';
  import flatten from 'lodash/flatten';
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

  const GENERIC_TS_ERROR_MSG = 'Data for at least 1 User-Defined time series field are required';

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
        GENERIC_TS_ERROR_MSG,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      infeasibleErrorList() {
        return filter(this.userInfeasible.errorListMsg, null);
      },
      isInfeasible() {
        return this.infeasibleErrorList.length !== 0;
      },
      isRequiredTSFields() {
        // return an object of booleans for every TS_FIELD,
        //   indicating if each is required
        const isRequiredObject = {};
        // const isOneRequiredTS = false;
        (TS_FIELDS).forEach((tsField) => {
          // only 1 TS is required, of 6 possible
          // have all TS that are valid be required=true,
          if (this[tsField].data.length !== 0
            || (this.tsData(tsField).data.length !== 0
            && this[this.useExistingField(tsField)])) {
            isRequiredObject[tsField] = true;
          } else {
            isRequiredObject[tsField] = false;
          }
        });
        // if no TS are valid, then have the first one that appears on the page required=true
        if (Object.values(isRequiredObject).every(item => item === false)) {
          isRequiredObject[TS_FIELDS[2]] = true;
        }
        return isRequiredObject;
      },
    },
    methods: {
      appendInfeasibleToErrorList() {
        if (this.isInfeasible) {
          this.$store.dispatch('Application/setErrorList', this.getInfeasibleListPayload());
        }
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getInfeasibleErrorMsgs() {
        return this[TS_FIELDS[0]].formatErrorMsgArray(this.userInfeasible.errorMsg);
      },
      getInfeasibleListPayload() {
        const errors = this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE];
        errors.push(this.infeasibleErrorList);
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: flatten(errors),
        };
      },
      infeasibleEnergy() {
        return this.tsData('tsUserEnergyMax')
          .infeasibleCheckMaxMustExceedMin(this.tsData('tsUserEnergyMin'));
      },
      infeasiblePowerExport() {
        return this.tsData('tsUserPowerExportMax')
          .infeasibleCheckMaxMustExceedMin(this.tsData('tsUserPowerExportMin'));
      },
      infeasiblePowerImport() {
        return this.tsData('tsUserPowerImportMax')
          .infeasibleCheckMaxMustExceedMin(this.tsData('tsUserPowerImportMin'));
      },
      infeasibleChecks() {
        const infeasibleObject = { errorMsg: [], errorListMsg: [] };
        const checks = [
          this.infeasiblePowerExport(),
          this.infeasiblePowerImport(),
          this.infeasibleEnergy(),
        ];
        Object.values(checks).forEach((check) => {
          infeasibleObject.errorMsg.push(check.errorMsg);
          infeasibleObject.errorListMsg.push(check.errorListMsg);
        });
        return infeasibleObject;
      },
      receiveRemove(payload) {
        csvUploadMixin.methods.receiveRemove.bind(this)(payload);
        // check for infeasibilities and save userInfeasible object
        this.userInfeasible = this.infeasibleChecks();
        this.$store.dispatch(this.metadata.userInfeasible.actionSetName, this.userInfeasible);
        this.appendInfeasibleToErrorList();
      },
      requiredDataLabel() {
        // have a generic Project error message for any TS on this page
        //   since at least 1 is required
        return GENERIC_TS_ERROR_MSG;
      },
      validatedSave() {
        // check for infeasibilities and set userInfeasible object
        this.userInfeasible = this.infeasibleChecks();
        csvUploadMixin.methods.validatedSave.bind(this)();
        this.appendInfeasibleToErrorList();
      },
    },
  };
</script>
