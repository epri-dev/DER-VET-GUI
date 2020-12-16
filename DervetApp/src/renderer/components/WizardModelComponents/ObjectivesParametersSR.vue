<template>
  <div>
    <h3>Services: Spinning Reserve Price</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="srGrowth"
                  v-bind:field="metadata.srGrowth"
                  :isInvalid="submitted && $v.srGrowth.$error"
                  :errorMessage="getErrorMsg('srGrowth')">
      </text-input>

      <text-input v-model="srDuration"
                  v-bind:field="metadata.srDuration"
                  :isInvalid="submitted && $v.srDuration.$error"
                  :errorMessage="getErrorMsg('srDuration')">
      </text-input>

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        data-name="spinning reserve price"
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
  import * as p from '@/models/Project/Project';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import SRPriceTimeSeries from '@/models/TimeSeries/SRPriceTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.SR_FIELDS);

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        srPrice: p.srPrice,
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
          return this.srPrice;
        }
        return new SRPriceTimeSeries(this.inputTimeseries);
      },
      complete() {
        return this.$store.state.Application.pageCompleteness.components.objectives.SR;
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
        return operateOnKeysList(this.$store.state.Project, c.SR_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: 'components',
          pageKey: 'objectives',
          page: 'SR',
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
          page: 'SR',
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
          this.$store.dispatch('setSRPrice', this.tsData);
        }
        this.$store.dispatch('setSRGrowth', this.srGrowth);
        this.$store.dispatch('setSRDuration', this.srDuration);
      },
    },
  };
</script>
