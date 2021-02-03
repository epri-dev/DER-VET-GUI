<template>
  <div>
    <h3>Services: Non-Spinning Reserve Price</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="nsrGrowth"
                  v-bind:field="metadata.nsrGrowth"
                  :isInvalid="submitted && $v.nsrGrowth.$error"
                  :errorMessage="getErrorMsg('nsrGrowth')">
      </text-input>

      <text-input v-model="nsrDuration"
                  v-bind:field="metadata.nsrDuration"
                  :isInvalid="submitted && $v.nsrDuration.$error"
                  :errorMessage="getErrorMsg('nsrDuration')">
      </text-input>

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="non-spinning reserve price"
        units="$/kW"
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
  import * as p from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import NSRPriceTimeSeries from '@/models/TimeSeries/NSRPriceTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.NSR_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'NSR';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        nsrPrice: p.nsrPrice,
        dataYear: p.dataYear,
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
          return this.nsrPrice;
        }
        return new NSRPriceTimeSeries(this.inputTimeseries);
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
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.NSR_FIELDS, f => f);
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
          this.$store.dispatch('setNSRPrice', this.tsData);
        }
        this.$store.dispatch('setNSRGrowth', this.nsrGrowth);
        this.$store.dispatch('setNSRDuration', this.nsrDuration);
      },
    },
  };
</script>
