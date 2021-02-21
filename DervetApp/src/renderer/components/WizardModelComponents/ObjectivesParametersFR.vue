<template>
  <div>
    <h3>Services: Frequency Regulation</h3>
    <hr>
    <form class="form-horizontal form-buffer">

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
        chart-name="tsFrPricechartUploaded"
        :constants="getConstants('tsFrPrice', CONSTANTS)"
        :data-exists="tsData('tsFrPrice').data.length !== 0"
        :data-name="metadata.tsFrPrice.displayName"
        :data-time-series="tsData('tsFrPrice')"
        :errorMessage="getErrorMsgTS('tsFrPrice')"
        :isInvalid="submitted && tsFrPrice.data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrPrice')"
        ts-name="tsFrPrice"
        :units="metadata.tsFrPrice.unit"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === true"
      />

      <timeseries-data-upload
        chart-name="tsFrUpPriceChartUploaded"
        :data-exists="tsData('tsFrUpPrice').data.length !== 0"
        :data-name="metadata.tsFrUpPrice.displayName"
        :data-time-series="tsData('tsFrUpPrice')"
        :errorMessage="getErrorMsgTS('tsFrUpPrice')"
        :isInvalid="submitted && tsFrUpPrice.data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrUpPrice')"
        ts-name="tsFrUpPrice"
        :units="metadata.tsFrUpPrice.unit"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === false"
      />

      <timeseries-data-upload
        chart-name="tsFrDownPriceChartUploaded"
        :data-exists="tsData('tsFrDownPrice').data.length !== 0"
        :data-name="metadata.tsFrDownPrice.displayName"
        :data-time-series="tsData('tsFrDownPrice')"
        :errorMessage="getErrorMsgTS('tsFrDownPrice')"
        :isInvalid="submitted && tsFrDownPrice.data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrDownPrice')"
        ts-name="tsFrDownPrice"
        :units="metadata.tsFrDownPrice.unit"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === false"
      />
      <hr>

      <save-buttons
        :continue-link="WIZARD_COMPONENT_PATH"
        :displayError="submitted && ($v.$anyError || isTSError)"
        :save="validatedSave" />

    </form>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import { projectMetadata as metadata } from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';

  const validations = metadata.getValidationSchema(c.FR_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'FR';
  const TS_FIELDS = c.TS_FR_FIELDS;

  const CONSTANTS = {
    PAGEGROUP,
    PAGEKEY,
    PAGE,
  };

  export default {
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      return {
        metadata,
        ...this.getDataFromProject(c.FR_FIELDS),
        ...this.getTSInputDefaultDataFromProject(TS_FIELDS),
        ...this.getChildKeys(TS_FIELDS),
        ...this.getUseExistingDefaults(TS_FIELDS),
        WIZARD_COMPONENT_PATH,
        CONSTANTS,
      };
    },
    validations: {
      ...validations,
    },
    // updated() {
    // this.$store.dispatch('Application/setErrorList', this.getErrorListPayload(CONSTANTS));
    // },
    computed: {
      complete() {
        // return this.$store.state.Application.pageCompleteness[PAGEGROUP][PAGEKEY][PAGE];
        return this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE] === 0;
      },
      isTSError() {
        return this.getErrorListTS().length !== 0;
      },
    },
    methods: {
      getErrorListTS() {
        const errors = [];
        (TS_FIELDS).forEach((key) => {
          // skip non-required keys
          if ((this.frCombinedMarket && key !== 'tsFrPrice')
            || (!this.frCombinedMarket && key === 'tsFrPrice')) {
            return;
          }
          if (this[key].data.length === 0) {
            errors.push(`A timeseries of ${this[key].columnHeaderName} is required`);
          }
        });
        return errors;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      validatedSave() {
        // set completeness
        // this.$store.dispatch('Application/setCompleteness',
        // this.getCompletenessPayload(CONSTANTS));
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload(CONSTANTS));
        // save
        this.tsSave(TS_FIELDS);
        this.save();
      },
      save() {
        this.$store.dispatch('setFReou', this.frEOU);
        this.$store.dispatch('setFReod', this.frEOD);
        this.$store.dispatch('setFRGrowth', this.frGrowth);
        this.$store.dispatch('setFREnergyGrowth', this.frEnergyPriceGrowth);
        this.$store.dispatch('setFRCombinedMarket', this.frCombinedMarket);
        this.$store.dispatch('setFRDuration', this.frDuration);
      },
    },
  };
</script>
