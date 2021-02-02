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
        chart-name="chartUploadedTimeSeries"
        data-name="frequency regulation price"
        units="$/kW"
        @uploaded="receiveTimeseriesData"
        :data-time-series="frPrice"
        :key="childKey"
        v-if="frCombinedMarket === true"
        :TimeSeriesModel="FRPriceTimeSeries"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries2"
        data-name="frequency regulation up price"
        units="$/kW"
        @uploaded="receiveTimeseriesData2"
        :TimeSeriesModel="FRUpPriceTimeSeries"
        :data-time-series="frUpPrice"
        :key="childKey2"
        v-if="frCombinedMarket === false"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries3"
        data-name="frequency regulation down price"
        units="$/kW"
        @uploaded="receiveTimeseriesData3"
        :TimeSeriesModel="FRDownPriceTimeSeries"
        :data-time-series="frDownPrice"
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
  import * as p from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import FRPriceTimeSeries from '@/models/TimeSeries/FRPriceTimeSeries';
  import FRUpPriceTimeSeries from '@/models/TimeSeries/FRUpPriceTimeSeries';
  import FRDownPriceTimeSeries from '@/models/TimeSeries/FRDownPriceTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.FR_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'FR';

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
        FRPriceTimeSeries,
        FRUpPriceTimeSeries,
        FRDownPriceTimeSeries,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      complete() {
        return this.$store.state.Application.pageCompleteness[PAGEGROUP][PAGEKEY][PAGE];
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
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          completeness: !this.$v.$invalid,
        };
      },
      getErrorListPayload() {
        const errors = [];
        Object.keys(this.$v).forEach((key) => {
          if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
            errors.push(this.getErrorMsg(key));
          }
        });
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: errors,
        };
      },
      validatedSave() {
        // set completeness
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        return this.save();
      },
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setFRPrice', this.inputTimeseries);
        }
        if (this.inputTimeseries2 !== null) {
          this.$store.dispatch('setFRUpPrice', this.inputTimeseries2);
        }
        if (this.inputTimeseries3 !== null) {
          this.$store.dispatch('setFRDownPrice', this.inputTimeseries3);
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
