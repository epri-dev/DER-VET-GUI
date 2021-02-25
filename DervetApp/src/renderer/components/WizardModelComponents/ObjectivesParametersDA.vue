<template>
  <div>
    <h3>Services: Day Ahead Energy Price</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="daGrowth"
                  v-bind:field="metadata.daGrowth"
                  :isInvalid="submitted && $v.daGrowth.$error"
                  :errorMessage="getErrorMsg('daGrowth')">
      </text-input>

      <timeseries-data-upload
        chart-name="chartUploadedTimeSeries"
        :data-name="name"
        units="kW"
        @uploaded="receiveTimeseriesData"
        :data-time-series="price"
        key="1"
        :TimeSeriesModel="DAPriceTimeSeries"
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
  import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.DA_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'DA';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        price: p.daPrice,
        name: 'day ahead price',
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
        DAPriceTimeSeries,
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
        return operateOnKeysList(this.$store.state.Project, c.DA_FIELDS, f => f);
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
        if (this.inputTimeseries[this.name] !== undefined) {
          this.$store.dispatch('setDAPrice', this.inputTimeseries[this.name]);
        }
        this.$store.dispatch('setDAGrowth', this.daGrowth);
      },
    },
  };
</script>
