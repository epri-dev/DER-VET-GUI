<template>
  <div>
    <h3>Services: Site Information</h3>
    <hr>
    <form class="form-horizontal form-buffer">
      <radio-button-input v-model="includeInterconnectionConstraints"
                          v-bind:field="metadata.includeInterconnectionConstraints"
                          :isInvalid="submitted && $v.includeInterconnectionConstraints.$error"
                          :errorMessage="getErrorMsg('includeInterconnectionConstraints')">
      </radio-button-input>

      <div class="form-group" v-if="includeInterconnectionConstraints">
        <text-input v-model="maxExport"
                    v-bind:field="metadata.maxExport"
                    :isInvalid="submitted && $v.maxExport.$error"
                    :errorMessage="getErrorMsg('maxExport')">
        </text-input>

        <text-input v-model="maxImport"
                    v-bind:field="metadata.maxImport"
                    :isInvalid="submitted && $v.maxImport.$error"
                    :errorMessage="getErrorMsg('maxImport')">
        </text-input>

      </div>

      <div class="form-group" v-if="includeSiteLoad === true">
        <timeseries-data-upload chart-name="chartUploadedTimeSeries"
                                :data-name="siteLoadName"
                                units="kW"
                                @uploaded="receiveTimeseriesData"
                                :data-time-series="siteLoad"
                                key="1"
                                :TimeSeriesModel="SiteLoadTimeSeries" />
        <div v-if="(siteLoad === null)">
          <hr>
          <div class="form-group row">
            <div class="col-md-12">
              <i>
                <a href="files/SampleSiteLoad-8760.csv" download class="important-link text-decoration-none">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep for a year with 365 days (8,760 readings)
              </i>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-12">
              <i>
                <a href="files/SampleSiteLoad-8784.csv" download class="important-link text-decoration-none">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep <b>for a leap year with 366 days</b> (8,784 readings)
              </i>
            </div>
          </div>
        </div>

      </div>
      <hr>

      <save-buttons :continue-link="WIZARD_COMPONENT_PATH"
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
  import '@/assets/samples/SampleSiteLoad-8760.csv';
  import '@/assets/samples/SampleSiteLoad-8784.csv';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import SiteLoadTimeSeries from '@/models/TimeSeries/SiteLoadTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.SITE_INFORMATION_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'siteInformation';

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        includeSiteLoad: p.includeSiteLoad,
        siteLoad: p.siteLoad,
        siteLoadName: 'site load',
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
        SiteLoadTimeSeries,
      };
    },
    validations: {
      ...validations,
      maxExport: {
        ...validations.maxExport,
        required: requiredIf(function isMaxExportRequired() {
          return this.includeInterconnectionConstraints;
        }),
      },
      maxImport: {
        ...validations.maxImport,
        required: requiredIf(function isMaxImportRequired() {
          return this.includeInterconnectionConstraints;
        }),
      },
    },
    computed: {

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
        return operateOnKeysList(this.$store.state.Project, c.SITE_INFORMATION_FIELDS, f => f);
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
        if (this.includeInterconnectionConstraints === false) {
          this.resetNonRequired(['maxExport', 'maxImport']);
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
        if (this.inputTimeseries[this.siteLoadName] !== undefined) {
          this.$store.dispatch('setSiteLoad', this.inputTimeseries[this.siteLoadName]);
        }
        this.$store.dispatch('setIncludePOIConstraints', this.includeInterconnectionConstraints);
        this.$store.dispatch('setMaxImportFromGrid', this.maxImport);
        this.$store.dispatch('setMaxExportToGrid', this.maxExport);
      },
    },
  };
</script>
