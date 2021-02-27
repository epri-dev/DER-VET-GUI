<template>
  <div>
    <h3>Services: Resource Adequacy</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="raNumberEvents"
                  v-bind:field="metadata.raNumberEvents"
                  :isInvalid="submitted && $v.raNumberEvents.$error"
                  :errorMessage="getErrorMsg('raNumberEvents')">
      </text-input>

      <text-input v-model="raEventLength"
                  v-bind:field="metadata.raEventLength"
                  :isInvalid="submitted && $v.raEventLength.$error"
                  :errorMessage="getErrorMsg('raEventLength')">
      </text-input>

      <radio-button-input
        v-model="raDispatchMode"
        v-bind:field="metadata.raDispatchMode"
        :isInvalid="submitted && $v.raDispatchMode.$error"
        :errorMessage="getErrorMsg('raDispatchMode')">
      </radio-button-input>

      <radio-button-input
        v-model="raEventSelectionMethod"
        v-bind:field="metadata.raEventSelectionMethod"
        :isInvalid="submitted && $v.raEventSelectionMethod.$error"
        :errorMessage="getErrorMsg('raEventSelectionMethod')">
      </radio-button-input>

      <text-input v-model="raGrowth"
                  v-bind:field="metadata.raGrowth"
                  :isInvalid="submitted && $v.raGrowth.$error"
                  :errorMessage="getErrorMsg('raGrowth')">
      </text-input>

      <monthly-data-upload
        chart-name="mtsRaCapacityPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('mtsRaCapacityPrice').data.length !== 0"
        :DataModel="MonthlyBase"
        :data-name="metadata.mtsRaCapacityPrice.displayName"
        :monthly-data="tsData('mtsRaCapacityPrice')"
        :errorMessage="getErrorMsgTS('mtsRaCapacityPrice')"
        :isInvalid="submitted && tsData('mtsRaCapacityPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('mtsRaCapacityPrice')"
        object-name="mtsRaCapacityPrice"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsRaActiveChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsRaActive').data.length !== 0"
        :DataModel="TimeSeriesBase"
        :data-name="metadata.tsRaActive.displayName"
        :data-time-series="tsData('tsRaActive')"
        :errorMessage="getErrorMsgTS('tsRaActive')"
        :isInvalid="submitted && tsData('tsRaActive').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsRaActive')"
        object-name="tsRaActive"
        @uploaded="receiveTimeseriesData"
        v-if="raEventSelectionMethod === 'Peak by Month with Active Hours'"
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
  import TimeSeriesBase from '@/models/TimeSeries/TimeSeriesBase';
  import MonthlyBase from '@/models/Monthly/MonthlyBase';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'RA';
  const FIELDS = c.RA_FIELDS;
  const TS_FIELDS = [...c.TS_RA_FIELDS, ...c.MTS_RA_FIELDS];

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
        TimeSeriesBase,
        MonthlyBase,
        CONSTANTS,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      isTSError() {
        return this.getErrorListTS(false).length !== 0;
      },
    },
    methods: {
      getErrorListTS(fromStore = true) {
        const errors = [];
        (TS_FIELDS).forEach((tsField) => {
          // skip non-required tsFields
          if (this.raEventSelectionMethod !== 'Peak by Month with Active Hours'
            && tsField === 'tsRaActive') {
            return;
          }
          const errorMsgTS = this.getErrorMsgTSFromProject(tsField, fromStore);
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
