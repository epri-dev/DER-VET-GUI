<template>
  <div>
    <h3>Services: Frequency Regulation</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="frGrowth"
                  v-bind:field="metadata.frGrowth"
                  :isInvalid="submitted && $v.frGrowth.$error"
                  :errorMessage="getErrorMsg('frGrowth')">
      </text-input>

      <text-input v-model="frEnergyPriceGrowth"
                  v-bind:field="metadata.frEnergyPriceGrowth"
                  :isInvalid="submitted && $v.frEnergyPriceGrowth.$error"
                  :errorMessage="getErrorMsg('frEnergyPriceGrowth')">
      </text-input>

      <text-input v-model="frEOU"
                  v-bind:field="metadata.frEOU"
                  :isInvalid="submitted && $v.frEOU.$error"
                  :errorMessage="getErrorMsg('frEOU')">
      </text-input>

      <text-input v-model="frEOD"
                  v-bind:field="metadata.frEOD"
                  :isInvalid="submitted && $v.frEOD.$error"
                  :errorMessage="getErrorMsg('frEOD')">
      </text-input>

      <text-input v-model="frDuration"
                  v-bind:field="metadata.frDuration"
                  :isInvalid="submitted && $v.frDuration.$error"
                  :errorMessage="getErrorMsg('frDuration')">
      </text-input>

      <radio-button-input
        v-model="frCombinedMarket"
        v-bind:field="metadata.frCombinedMarket"
        :isInvalid="submitted && $v.frCombinedMarket.$error"
        :errorMessage="getErrorMsg('frCombinedMarket')">
      </radio-button-input>

      <timeseries-data-upload
        chart-name="tsFrPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsFrPrice').data.length !== 0"
        :DataModel="TimeSeriesBase"
        :data-name="metadata.tsFrPrice.displayName"
        :data-time-series="tsData('tsFrPrice')"
        :errorMessage="getErrorMsgTS('tsFrPrice')"
        :isInvalid="submitted && tsData('tsFrPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrPrice')"
        object-name="tsFrPrice"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === true"
      />

      <timeseries-data-upload
        chart-name="tsFrUpPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsFrUpPrice').data.length !== 0"
        :DataModel="TimeSeriesBase"
        :data-name="metadata.tsFrUpPrice.displayName"
        :data-time-series="tsData('tsFrUpPrice')"
        :errorMessage="getErrorMsgTS('tsFrUpPrice')"
        :isInvalid="submitted && tsData('tsFrUpPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrUpPrice')"
        object-name="tsFrUpPrice"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === false"
      />

      <timeseries-data-upload
        chart-name="tsFrDownPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsFrDownPrice').data.length !== 0"
        :DataModel="TimeSeriesBase"
        :data-name="metadata.tsFrDownPrice.displayName"
        :data-time-series="tsData('tsFrDownPrice')"
        :errorMessage="getErrorMsgTS('tsFrDownPrice')"
        :isInvalid="submitted && tsData('tsFrDownPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrDownPrice')"
        object-name="tsFrDownPrice"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === false"
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

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'FR';
  const FIELDS = c.FR_FIELDS;
  const TS_FIELDS = c.TS_FR_FIELDS;

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
          if ((this.frCombinedMarket && tsField !== 'tsFrPrice')
            || (!this.frCombinedMarket && tsField === 'tsFrPrice')
            || this.frCombinedMarket === null) {
            return;
          }
          const errorMsgTS = `A timeseries of ${this[tsField].columnHeaderName} is required`;
          if (fromStore) {
            // get ts from the store
            if (this.$store.state.Project[tsField].data.length === 0) {
              errors.push(errorMsgTS);
            }
          } else {
            // get ts from this page
            const ts = this[tsField];
            const tsFieldInput = `${tsField}Input`;
            const tsInput = this[tsFieldInput];
            const tsFieldUseExisting = `${tsField}UseExisting`;
            const tsUseExisting = this[tsFieldUseExisting];
            if (ts.data.length === 0 && (tsInput === null || !tsUseExisting)) {
              errors.push(errorMsgTS);
            }
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
