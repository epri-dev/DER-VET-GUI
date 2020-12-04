<template>
  <div>
    <h3>Services: Frequency Regulation</h3>
    <hr>
    <form class="form-horizontal form-buffer">

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
        chart-name="chartUploadedTimeSeries"
        data-name="frequency regulation price"
        units="$/kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
        v-if="frCombinedMarket === true"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries2"
        data-name="frequency regulation up price"
        units="$/kW"
        @uploaded="receiveTimeseriesData2"
        :data-exists="(tsData2 !== null)"
        :data-time-series="tsData2"
        :key="childKey2"
        v-if="frCombinedMarket === false"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries3"
        data-name="frequency regulation down price"
        units="$/kW"
        @uploaded="receiveTimeseriesData3"
        :data-exists="(tsData3 !== null)"
        :data-time-series="tsData3"
        :key="childKey3"
        v-if="frCombinedMarket === false"
      />
      <hr>

      <save-buttons
        :continue-link="WIZARD_COMPONENT_PATH"
        :displayError="submitted && $v.$anyError"
        :save="validatedSave" />

    </form>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import * as p from '@/models/Project/Project';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import FRPriceTimeSeries from '@/models/TimeSeries/FRPriceTimeSeries';
  import FRUpPriceTimeSeries from '@/models/TimeSeries/FRUpPriceTimeSeries';
  import FRDownPriceTimeSeries from '@/models/TimeSeries/FRDownPriceTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.FR_FIELDS);

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        frPrice: p.frPrice,
        frUpPrice: p.frUpPrice,
        frDownPrice: p.frDownPrice,
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.frPrice;
        }
        return new FRPriceTimeSeries(this.inputTimeseries);
      },
      tsData2() {
        if (this.inputTimeseries2 === null) {
          return this.frUpPrice;
        }
        return new FRUpPriceTimeSeries(this.inputTimeseries2);
      },
      tsData3() {
        if (this.inputTimeseries3 === null) {
          return this.frDownPrice;
        }
        return new FRDownPriceTimeSeries(this.inputTimeseries3);
      },
      complete() {
        return this.$store.state.Application.pageCompleteness.components.objectivesFR;
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.complete !== null && this.complete !== undefined) {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.FR_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: 'components',
          page: 'objectivesFR',
          completeness: !this.$v.$invalid,
        };
      },
      validatedSave() {
        // set complete to true or false
        this.$store.dispatch('setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        return this.save();
      },
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setFRPrice', this.tsData);
        }
        if (this.inputTimeseries2 !== null) {
          this.$store.dispatch('setFRUpPrice', this.tsData2);
        }
        if (this.inputTimeseries3 !== null) {
          this.$store.dispatch('setFRDownPrice', this.tsData3);
        }
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
