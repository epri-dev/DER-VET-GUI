<template>
  <div>
    <h3>Services: Reliability Targets</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <radio-button-input v-model="reliabilityPostOptimizationOnly"
                          v-bind:field="metadata.reliabilityPostOptimizationOnly"
                          :isInvalid="submitted && $v.reliabilityPostOptimizationOnly.$error"
                          :errorMessage="getErrorMsg('reliabilityPostOptimizationOnly')">
      </radio-button-input>

      <text-input v-model="reliabilityTarget"
                  v-if="reliabilityPostOptimizationOnly === false"
                  v-bind:field="metadata.reliabilityTarget"
                  :isInvalid="submitted && $v.reliabilityTarget.$error"
                  :errorMessage="getErrorMsg('reliabilityTarget')">
      </text-input>

      <text-input v-model="reliabilityMaxOutageDuration"
                  v-bind:field="metadata.reliabilityMaxOutageDuration"
                  :isInvalid="submitted && $v.reliabilityMaxOutageDuration.$error"
                  :errorMessage="getErrorMsg('reliabilityMaxOutageDuration')">
      </text-input>

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="critical load"
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
  import { requiredIf } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import * as p from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import CriticalLoadTimeSeries from '@/models/TimeSeries/CriticalLoadTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.RESILIENCE_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'resilience';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        criticalLoad: p.criticalLoad,
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
      };
    },
    validations: {
      ...validations,
      reliabilityTarget: {
        ...validations.reliabilityTarget,
        required: requiredIf(function isReliabilityTargetRequired() {
          return (this.reliabilityPostOptimizationOnly === false);
        }),
      },
    },
    computed: {
      tsData() {
        if (this.inputTimeseries === null) {
          return this.criticalLoad;
        }
        return new CriticalLoadTimeSeries(this.inputTimeseries);
      },
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
      resetNonRequired(list) {
        list.forEach((item) => {
          this[item] = this.metadata.getDefaultValues()[item];
        });
        return true;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.RESILIENCE_FIELDS, f => f);
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
        // reset all non-required inputs to their defaults prior to saving
        if (this.reliabilityPostOptimizationOnly === true) {
          this.resetNonRequired(['reliabilityTarget']);
        }
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
          this.$store.dispatch('setCriticalLoad', this.tsData);
        }
        this.$store.dispatch('setReliabilityPostOptimizationOnly', this.reliabilityPostOptimizationOnly);
        this.$store.dispatch('setReliabilityTarget', this.reliabilityTarget);
        this.$store.dispatch('setReliabilityMaxOutageDuration', this.reliabilityMaxOutageDuration);
      },
    },
  };
</script>
