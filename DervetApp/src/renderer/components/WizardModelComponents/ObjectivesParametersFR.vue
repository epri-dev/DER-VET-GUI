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
        @click="receiveRemove"
        :data-exists="tsData('tsFrPrice').data.length !== 0"
        :data-name="metadata.tsFrPrice.displayName"
        :data-time-series="tsData('tsFrPrice')"
        :errorMessage="getErrorMsgTS('tsFrPrice')"
        :isInvalid="submitted && tsData('tsFrPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrPrice')"
        ts-name="tsFrPrice"
        :units="metadata.tsFrPrice.unit"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === true"
      />

      <timeseries-data-upload
        chart-name="tsFrUpPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsFrUpPrice').data.length !== 0"
        :data-name="metadata.tsFrUpPrice.displayName"
        :data-time-series="tsData('tsFrUpPrice')"
        :errorMessage="getErrorMsgTS('tsFrUpPrice')"
        :isInvalid="submitted && tsData('tsFrUpPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsFrUpPrice')"
        ts-name="tsFrUpPrice"
        :units="metadata.tsFrUpPrice.unit"
        @uploaded="receiveTimeseriesData"
        v-if="frCombinedMarket === false"
      />

      <timeseries-data-upload
        chart-name="tsFrDownPriceChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsFrDownPrice').data.length !== 0"
        :data-name="metadata.tsFrDownPrice.displayName"
        :data-time-series="tsData('tsFrDownPrice')"
        :errorMessage="getErrorMsgTS('tsFrDownPrice')"
        :isInvalid="submitted && tsData('tsFrDownPrice').data.length === 0"
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
    computed: {
      complete() {
        // return this.$store.state.Application.pageCompleteness[PAGEGROUP][PAGEKEY][PAGE];
        return this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE] === 0;
      },
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
            || (!this.frCombinedMarket && tsField === 'tsFrPrice')) {
            return;
          }
          if (fromStore) {
            // get ts from the store
            if (this.$store.state.Project[tsField].data.length === 0) {
              errors.push(`A timeseries of ${this[tsField].columnHeaderName} is required`);
            }
          } else {
            // get ts from this page
            const ts = this[tsField];
            const tsFieldInput = `${tsField}Input`;
            const tsInput = this[tsFieldInput];
            const tsFieldUseExisting = `${tsField}UseExisting`;
            const tsUseExisting = this[tsFieldUseExisting];
            if ((ts.data.length === 0 && tsInput === null)
              || (ts.data.length === 0 && !tsUseExisting)) {
              errors.push(`A timeseries of ${this[tsField].columnHeaderName} is required`);
            }
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
        // save
        this.tsSave(TS_FIELDS);
        this.save();
        // set errorList (important to do this AFTER tsSave())
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
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
