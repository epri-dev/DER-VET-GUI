<template>
  <div>
    <h3>Services: Load Following</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="lfGrowth"
                  v-bind:field="metadata.lfGrowth"
                  :isInvalid="submitted && $v.lfGrowth.$error"
                  :errorMessage="getErrorMsg('lfGrowth')">
      </text-input>

      <text-input v-model="lfEnergyPriceGrowth"
                  v-bind:field="metadata.lfEnergyPriceGrowth"
                  :isInvalid="submitted && $v.lfEnergyPriceGrowth.$error"
                  :errorMessage="getErrorMsg('lfEnergyPriceGrowth')">
      </text-input>

      <text-input v-model="lfDuration"
                  v-bind:field="metadata.lfDuration"
                  :isInvalid="submitted && $v.lfDuration.$error"
                  :errorMessage="getErrorMsg('lfDuration')">
      </text-input>

      <radio-button-input
        v-model="lfCombinedMarket"
        v-bind:field="metadata.lfCombinedMarket"
        :isInvalid="submitted && $v.lfCombinedMarket.$error"
        :errorMessage="getErrorMsg('lfCombinedMarket')">
      </radio-button-input>

      <timeseries-data-upload
        chart-name="tsLfEOUChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsLfEOU').data.length !== 0"
        :DataModel="metadata.tsLfEOU.DataModel"
        :data-name="metadata.tsLfEOU.displayName"
        :data-time-series="tsData('tsLfEOU')"
        :errorMessage="getErrorMsgTS('tsLfEOU')"
        :isInvalid="submitted && tsData('tsLfEOU').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsLfEOU')"
        object-name="tsLfEOU"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsLfEODChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsLfEOD').data.length !== 0"
        :DataModel="metadata.tsLfEOD.DataModel"
        :data-name="metadata.tsLfEOD.displayName"
        :data-time-series="tsData('tsLfEOD')"
        :errorMessage="getErrorMsgTS('tsLfEOD')"
        :isInvalid="submitted && tsData('tsLfEOD').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsLfEOD')"
        object-name="tsLfEOD"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
      />

      <timeseries-data-upload
        chart-name="tsLfPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsLfPrice').data.length !== 0"
        :DataModel="metadata.tsLfPrice.DataModel"
        :data-name="metadata.tsLfPrice.displayName"
        :data-time-series="tsData('tsLfPrice')"
        :errorMessage="getErrorMsgTS('tsLfPrice')"
        :isInvalid="submitted && tsData('tsLfPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsLfPrice')"
        object-name="tsLfPrice"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
        v-if="lfCombinedMarket === true"
      />

      <timeseries-data-upload
        chart-name="tsLfUpPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsLfUpPrice').data.length !== 0"
        :DataModel="metadata.tsLfUpPrice.DataModel"
        :data-name="metadata.tsLfUpPrice.displayName"
        :data-time-series="tsData('tsLfUpPrice')"
        :errorMessage="getErrorMsgTS('tsLfUpPrice')"
        :isInvalid="submitted && tsData('tsLfUpPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsLfUpPrice')"
        object-name="tsLfUpPrice"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
        v-if="lfCombinedMarket === false"
      />

      <timeseries-data-upload
        chart-name="tsLfDownPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsLfDownPrice').data.length !== 0"
        :DataModel="metadata.tsLfDownPrice.DataModel"
        :data-name="metadata.tsLfDownPrice.displayName"
        :data-time-series="tsData('tsLfDownPrice')"
        :errorMessage="getErrorMsgTS('tsLfDownPrice')"
        :isInvalid="submitted && tsData('tsLfDownPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsLfDownPrice')"
        object-name="tsLfDownPrice"
        :show-sample-data="isTSError"
        @uploaded="receiveTimeseriesData"
        v-if="lfCombinedMarket === false"
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
  import '@/assets/samples/Sample_LFDownPrice_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_LFDownPrice_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_LFEnergyOptionDown_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_LFEnergyOptionDown_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_LFEnergyOptionUp_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_LFEnergyOptionUp_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_LFUpPrice_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_LFUpPrice_TimeSeries_8784.csv';
  import '@/assets/samples/Sample_LFPrice_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_LFPrice_TimeSeries_8784.csv';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'LF';
  const FIELDS = c.LF_FIELDS;
  const TS_FIELDS = [...c.TS_LF_FIELDS];

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
          switch (this.lfCombinedMarket) {
            case 'false': {
              if (tsField === 'tsLfPrice') return;
              break;
            }
            case 'true': {
              if (['tsLfUpPrice', 'tsLfDownPrice'].includes(tsField)) return;
              break;
            }
            default: {
              if (['tsLfUpPrice', 'tsLfDownPrice', 'tsLfPrice'].includes(tsField)) return;
            }
          }
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
