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
        data-name="deferral load"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-exists="(tsData !== null)"
        :data-time-series="tsData"
        :key="childKey"
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
  import DeferralLoadTimeSeries from '@/models/TimeSeries/DeferralLoadTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.DEFERRAL_FIELDS);

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        deferralLoad: p.deferralLoad,
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
          return this.deferralLoad;
        }
        return new DeferralLoadTimeSeries(this.inputTimeseries);
      },
      complete() {
        return this.$store.state.Application.pageCompleteness.components.objectives.deferral;
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
        return operateOnKeysList(this.$store.state.Project, c.DEFERRAL_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: 'components',
          pageKey: 'objectives',
          page: 'deferral',
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
          page: 'deferral',
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
          this.$store.dispatch('setDeferralLoad', this.tsData);
        }
        this.$store.dispatch('setDeferralPlannedLoadLimit', this.deferralPlannedLoadLimit);
        this.$store.dispatch('setDeferralReversePowerFlowLimit', this.deferralReversePowerFlowLimit);
        this.$store.dispatch('setDeferralGrowth', this.deferralGrowth);
        this.$store.dispatch('setDeferralPrice', this.deferralPrice);
      },
    },
  };
</script>
