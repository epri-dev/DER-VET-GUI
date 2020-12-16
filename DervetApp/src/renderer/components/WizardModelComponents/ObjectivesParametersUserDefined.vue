<template>
  <div>
    <h3>Services: User-Defined Settings</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="userPrice"
                  v-bind:field="metadata.userPrice"
                  :isInvalid="submitted && $v.userPrice.$error"
                  :errorMessage="getErrorMsg('userPrice')">
      </text-input>

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="maximum power"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries2"
        data-name="minimum power"
        units="kW"
        @uploaded="receiveTimeseriesData2"
        :data-exists="(tsData2 !== null)"
        :data-time-series="tsData2"
        :key="childKey2"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries3"
        data-name="maximum energy"
        units="kWh"
        @uploaded="receiveTimeseriesData3"
        :data-exists="(tsData3 !== null)"
        :data-time-series="tsData3"
        :key="childKey3"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries4"
        data-name="minimum energy"
        units="kWh"
        @uploaded="receiveTimeseriesData4"
        :data-exists="(tsData4 !== null)"
        :data-time-series="tsData4"
        :key="childKey4"
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
  import UserPowerMaxTimeSeries from '@/models/TimeSeries/UserPowerMaxTimeSeries';
  import UserPowerMinTimeSeries from '@/models/TimeSeries/UserPowerMinTimeSeries';
  import UserEnergyMaxTimeSeries from '@/models/TimeSeries/UserEnergyMaxTimeSeries';
  import UserEnergyMinTimeSeries from '@/models/TimeSeries/UserEnergyMinTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.USER_DEFINED_FIELDS);

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        userPowerMax: p.userPowerMax,
        userPowerMin: p.userPowerMin,
        userEnergyMax: p.userEnergyMax,
        userEnergyMin: p.userEnergyMin,
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
          return this.userPowerMax;
        }
        return new UserPowerMaxTimeSeries(this.inputTimeseries);
      },
      tsData2() {
        if (this.inputTimeseries2 === null) {
          return this.userPowerMin;
        }
        return new UserPowerMinTimeSeries(this.inputTimeseries2);
      },
      tsData3() {
        if (this.inputTimeseries3 === null) {
          return this.userEnergyMax;
        }
        return new UserEnergyMaxTimeSeries(this.inputTimeseries3);
      },
      tsData4() {
        if (this.inputTimeseries4 === null) {
          return this.userEnergyMin;
        }
        return new UserEnergyMinTimeSeries(this.inputTimeseries4);
      },
      complete() {
        return this.$store.state.Application.pageCompleteness.components.objectives.userDefined;
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
        return operateOnKeysList(this.$store.state.Project, c.USER_DEFINED_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: 'components',
          pageKey: 'objectives',
          page: 'userDefined',
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
          pageGroup: 'components',
          pageKey: 'objectives',
          page: 'userDefined',
          errorList: errors,
        };
      },
      validatedSave() {
        // set completeness
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        if (this.complete !== true) {
          this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        }
        return this.save();
      },
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setUserPowerMax', this.tsData);
        }
        if (this.inputTimeseries2 !== null) {
          this.$store.dispatch('setUserPowerMin', this.tsData2);
        }
        if (this.inputTimeseries3 !== null) {
          this.$store.dispatch('setUserEnergyMax', this.tsData3);
        }
        if (this.inputTimeseries4 !== null) {
          this.$store.dispatch('setUserEnergyMin', this.tsData4);
        }
        this.$store.dispatch('setUserPrice', this.userPrice);
      },
    },
  };
</script>
