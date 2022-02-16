<template>
  <div>
    <h3>Services: User-Defined Settings</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <text-input v-model="userPrice"
                  :metadata="metadata.userPrice"
                  :isInvalid="submitted && $v.userPrice.$error"
                  :errorMessage="getErrorMsg('userPrice')">
      </text-input>

      <div v-if="submitted && !atLeastOneDataExists">
        <br>
        <div class="error-text-color" v-html="pageError"/>
      </div>

      <hr>

      <time-series-upload
        :chartKey="chartKey"
        :data="tsUserPowerExportMax"
        :metadata="metadata.tsUserPowerExportMax"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsUserPowerExportMax"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsUserPowerExportMin"
        :metadata="metadata.tsUserPowerExportMin"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsUserPowerExportMin"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsUserPowerImportMax"
        :metadata="metadata.tsUserPowerImportMax"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsUserPowerImportMax"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsUserPowerImportMin"
        :metadata="metadata.tsUserPowerImportMin"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsUserPowerImportMin"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsUserEnergyMax"
        :metadata="metadata.tsUserEnergyMax"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsUserEnergyMax"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="tsUserEnergyMin"
        :metadata="metadata.tsUserEnergyMin"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsUserEnergyMin"
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
  import _ from 'lodash';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import CollectionTypes from '@/models/Project/CollectionTypes';

  const TS_ERROR_MSG = 'Data for at least one user-defined time series field are required';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return {
        ...this.getData(CollectionTypes.Project, Page.ObjectivesUserDefined),
        pageError: TS_ERROR_MSG,
      };
    },
    computed: {
      atLeastOneDataExists() {
        return _.some(this.timeSeriesFields, field => this[field].length !== 0);
      },
    },
    methods: {
      getOtherError() {
        // TODO this should live in ValidationService
        return this.atLeastOneDataExists ? {} : { page: TS_ERROR_MSG };
      },
    },
  };
</script>
