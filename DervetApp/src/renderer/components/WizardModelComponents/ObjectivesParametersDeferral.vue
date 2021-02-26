<template>
  <div>
    <h3>Services: Deferral</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="deferralPlannedLoadLimit"
                  v-bind:field="metadata.deferralPlannedLoadLimit"
                  :isInvalid="submitted && $v.deferralPlannedLoadLimit.$error"
                  :errorMessage="getErrorMsg('deferralPlannedLoadLimit')">
      </text-input>

      <text-input v-model="deferralReversePowerFlowLimit"
                  v-bind:field="metadata.deferralReversePowerFlowLimit"
                  :isInvalid="submitted && $v.deferralReversePowerFlowLimit.$error"
                  :errorMessage="getErrorMsg('deferralReversePowerFlowLimit')">
      </text-input>

      <text-input v-model="deferralGrowth"
                  v-bind:field="metadata.deferralGrowth"
                  :isInvalid="submitted && $v.deferralGrowth.$error"
                  :errorMessage="getErrorMsg('deferralGrowth')">
      </text-input>

      <text-input v-model="deferralPrice"
                  v-bind:field="metadata.deferralPrice"
                  :isInvalid="submitted && $v.deferralPrice.$error"
                  :errorMessage="getErrorMsg('deferralPrice')">
      </text-input>

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        :data-name="loadName"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-time-series="deferralLoad"
        key="1"
        :TimeSeriesModel="DeferralLoadTimeSeries"
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
  import DeferralLoadTimeSeries from '@/models/TimeSeries/DeferralLoadTimeSeries';
  import { WIZARD_COMPONENT } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.DEFERRAL_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'deferral';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        deferralLoad: p.deferralLoad,
        loadName: 'deferral load',
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT,
        DeferralLoadTimeSeries,
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
        return operateOnKeysList(this.$store.state.Project, c.DEFERRAL_FIELDS, f => f);
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
        if (this.inputTimeseries[this.loadName] !== undefined) {
          this.$store.dispatch('setDeferralLoad', this.inputTimeseries[this.loadName]);
        }
        this.$store.dispatch('setDeferralPlannedLoadLimit', this.deferralPlannedLoadLimit);
        this.$store.dispatch('setDeferralReversePowerFlowLimit', this.deferralReversePowerFlowLimit);
        this.$store.dispatch('setDeferralGrowth', this.deferralGrowth);
        this.$store.dispatch('setDeferralPrice', this.deferralPrice);
      },
    },
  };
</script>
