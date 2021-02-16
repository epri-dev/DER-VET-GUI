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
        :data-name="userPowerMaxName"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-time-series="userPowerMax"
        key="1"
        :TimeSeriesModel="UserPowerMaxTimeSeries"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries2"
        :data-name="userPowerMinName"
        units="kW"
        @uploaded="receiveTimeseriesData2"
        :data-time-series="userPowerMin"
        :key="2"
        :TimeSeriesModel="UserPowerMinTimeSeries"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries3"
        data-name="userEnergyMaxName"
        units="kWh"
        @uploaded="receiveTimeseriesData3"
        :data-time-series="userEnergyMax"
        key="3"
        :TimeSeriesModel="UserEnergyMaxTimeSeries"
      />

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries4"
        data-name="userEnergyMinName"
        units="kWh"
        @uploaded="receiveTimeseriesData4"
        :data-time-series="userEnergyMin"
        key="4"
        :TimeSeriesModel="UserEnergyMinTimeSeries"
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
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import { isNotNullAndNotUndefined } from '@/util/logic';
  import UserPowerMaxTimeSeries from '@/models/TimeSeries/UserPowerMaxTimeSeries';
  import UserPowerMinTimeSeries from '@/models/TimeSeries/UserPowerMinTimeSeries';
  import UserEnergyMaxTimeSeries from '@/models/TimeSeries/UserEnergyMaxTimeSeries';
  import UserEnergyMinTimeSeries from '@/models/TimeSeries/UserEnergyMinTimeSeries';
  import { WIZARD_COMPONENT } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.USER_DEFINED_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'userDefined';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        userPowerMax: p.userPowerMax,
        userPowerMaxName: 'maximum power',
        userPowerMin: p.userPowerMin,
        userPowerMinName: 'minimum power',
        userEnergyMax: p.userEnergyMax,
        userEnergyMaxName: 'maximum energy',
        userEnergyMin: p.userEnergyMin,
        userEnergyMinName: 'minimum energy',
        UserPowerMaxTimeSeries,
        UserPowerMinTimeSeries,
        UserEnergyMaxTimeSeries,
        UserEnergyMinTimeSeries,
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT,
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
      // initially, complete is null; after saving, it is set to either true or false.
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
        return operateOnKeysList(this.$store.state.Project, c.USER_DEFINED_FIELDS, f => f);
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
        if (this.inputTimeseries[this.userPowerMaxName] !== undefined) {
          this.$store.dispatch('setUserPowerMax', this.inputTimeseries[this.userPowerMaxName]);
        }
        if (this.inputTimeseries[this.userPowerMin] !== undefined) {
          this.$store.dispatch('setUserPowerMin', this.inputTimeseries[this.userPowerMin]);
        }
        if (this.inputTimeseries[this.userEnergyMax] !== undefined) {
          this.$store.dispatch('setUserEnergyMax', this.inputTimeseries[this.userEnergyMax]);
        }
        if (this.inputTimeseries[this.userEnergyMin] !== undefined) {
          this.$store.dispatch('setUserEnergyMin', this.inputTimeseries[this.userEnergyMin]);
        }
        this.$store.dispatch('setUserPrice', this.userPrice);
      },
    },
  };
</script>
