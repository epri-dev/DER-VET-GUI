<template>
  <div>
    <h3>Services: Load Following</h3>
    <hr>
    <form class="form-horizontal form-buffer">

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
        chart-name="chartUploadedEOUTimeSeries"
        data-name="energy option up"
        units="$/kW"
        :TimeSeriesModel="LFEnergyOptionUpTimeSeries"
        @uploaded="receiveTimeseriesData"
        :data-time-series="energyOptionUp"
        key="1"
      />
      <timeseries-data-upload
        chart-name="chartUploadedEODTimeSeries"
        data-name="energy option down"
        units="$/kW"
        :TimeSeriesModel="LFEnergyOptionDownTimeSeries"
        @uploaded="receiveTimeseriesData"
        :data-time-series="energyOptionDown"
        key="2"
      />

      <timeseries-data-upload
        chart-name="chartUploadedPriceTimeSeries"
        data-name="load following price"
        units="$/kW"
        :TimeSeriesModel="LFPriceTimeSeries"
        @uploaded="receiveTimeseriesData"
        :data-time-series="price"
        key="3"
        v-if="lfCombinedMarket === true"
      />

      <timeseries-data-upload
        chart-name="chartUploadedUpPriceTimeSeries2"
        data-name="load following up price"
        units="$/kW"
        :TimeSeriesModel="LFUpPriceTimeSeries"
        @uploaded="receiveTimeseriesData"
        :data-time-series="upPrice"
        key="4"
        v-if="lfCombinedMarket === false"
      />

      <timeseries-data-upload
        chart-name="chartUploadedDownPriceTimeSeries3"
        data-name="load following down price"
        units="$/kW"
        :TimeSeriesModel="LFDownPriceTimeSeries"
        @uploaded="receiveTimeseriesData"
        :data-time-series="downPrice"
        key="5"
        v-if="lfCombinedMarket === false"
      />
      <hr>

      <save-buttons
        :continue-link="WIZARD_COMPONENT"
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
  import { isNotNullAndNotUndefined } from '@/util/logic';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import LFPriceTimeSeries from '@/models/TimeSeries/LFPriceTimeSeries';
  import LFUpPriceTimeSeries from '@/models/TimeSeries/LFUpPriceTimeSeries';
  import LFDownPriceTimeSeries from '@/models/TimeSeries/LFDownPriceTimeSeries';
  import LFEnergyOptionDownTimeSeries from '@/models/TimeSeries/LFEnergyOptionDownTimeSeries';
  import LFEnergyOptionUpTimeSeries from '@/models/TimeSeries/LFEnergyOptionUpTimeSeries';
  import { WIZARD_COMPONENT } from '@/router/constants';
  import {
    SET_LF_COMBINED_MARKET,
    SET_LF_DOWN_PRICE,
    SET_LF_DURATION,
    SET_LF_EOU,
    SET_LF_EOD,
    SET_LF_PRICE,
    SET_LF_UP_PRICE,
    SET_LF_GROWTH,
    SET_LF_ENERGY_GROWTH,
  } from '@/store/actionTypes';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.LF_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'LF';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const projState = this.$store.state.Project;
      return {
        price: projState.lfPrice,
        upPrice: projState.lfUpPrice,
        downPrice: projState.lfDownPrice,
        energyOptionUp: projState.lfEOU,
        energyOptionDown: projState.lfEOD,
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT,
        LFPriceTimeSeries,
        LFUpPriceTimeSeries,
        LFDownPriceTimeSeries,
        LFEnergyOptionUpTimeSeries,
        LFEnergyOptionDownTimeSeries,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      errorList() {
        return this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE];
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, errorList is null/undefined
      // we want to show validation errors at any time after the first save, with submitted.
      if (isNotNullAndNotUndefined(this.errorList)) {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.LF_FIELDS, f => f);
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
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        return this.save();
      },
      save() {
        if (this.inputTimeseries['load following price'] !== undefined) {
          this.$store.dispatch(SET_LF_PRICE, this.inputTimeseries['load following price']);
        }
        if (this.inputTimeseries['load following up price'] !== undefined) {
          this.$store.dispatch(SET_LF_UP_PRICE, this.inputTimeseries['load following up price']);
        }
        if (this.inputTimeseries['load following down price'] !== undefined) {
          this.$store.dispatch(SET_LF_DOWN_PRICE, this.inputTimeseries['load following down price']);
        }
        if (this.inputTimeseries['energy option up'] !== undefined) {
          this.$store.dispatch(SET_LF_EOU, this.inputTimeseries['energy option up']);
        }
        if (this.inputTimeseries['energy option down'] !== undefined) {
          this.$store.dispatch(SET_LF_EOD, this.inputTimeseries['energy option down']);
        }

        this.$store.dispatch(SET_LF_COMBINED_MARKET, this.lfCombinedMarket);
        this.$store.dispatch(SET_LF_DURATION, this.lfDuration);
        this.$store.dispatch(SET_LF_GROWTH, this.lfGrowth);
        this.$store.dispatch(SET_LF_ENERGY_GROWTH, this.lfEnergyPriceGrowth);
      },
    },
  };
</script>
