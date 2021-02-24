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
        :data-name="priceName"
        units="$/kW"
        @uploaded="receiveTimeseriesData"
        :data-time-series="price"
        key="1"
        :TimeSeriesModel="SRPriceTimeSeries"
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
  import { isNotNullAndNotUndefined } from '@/util/logic';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import SRPriceTimeSeries from '@/models/TimeSeries/SRPriceTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.SR_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'SR';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        price: p.srPrice,
        priceName: 'spinning reserve price',
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
        SRPriceTimeSeries,
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
        return operateOnKeysList(this.$store.state.Project, c.SR_FIELDS, f => f);
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
        if (this.inputTimeseries[this.priceName] !== undefined) {
          this.$store.dispatch('setSRPrice', this.inputTimeseries[this.priceName]);
        }
        this.$store.dispatch('setSRGrowth', this.srGrowth);
        this.$store.dispatch('setSRDuration', this.srDuration);
      },
    },
  };
</script>
