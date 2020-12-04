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
                                data-name="site load"
                                units="kW"
                                @uploaded="receiveTimeseriesData"
                                :data-exists="(tsData !== null)"
                                :data-time-series="tsData"
                                :key="childKey" />
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
  import * as p from '@/models/Project/Project';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import '@/assets/samples/SampleSiteLoad-8760.csv';
  import '@/assets/samples/SampleSiteLoad-8784.csv';
  import csvUploadMixin from '@/mixins/csvUploadMixin';
  import SiteLoadTimeSeries from '@/models/TimeSeries/SiteLoadTimeSeries';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import TimeseriesDataUpload from './TimeseriesDataUpload';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.SITE_INFORMATION_FIELDS);

  export default {
    components: { TimeseriesDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        includeSiteLoad: p.includeSiteLoad,
        siteLoad: p.siteLoad,
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
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
      tsData() {
        if (this.inputTimeseries === null) {
          return this.siteLoad;
        }
        return new SiteLoadTimeSeries(this.inputTimeseries);
      },
      complete() {
        return this.$store.state.Application.pageCompleteness.components.objectivesSiteInformation;
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
          pageGroup: 'components',
          page: 'objectivesSiteInformation',
          completeness: !this.$v.$invalid,
        };
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.includeInterconnectionConstraints === false) {
          this.resetNonRequired(['maxExport', 'maxImport']);
        }
        // set complete to true or false
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        return this.save();
      },
      save() {
        if (this.inputTimeseries !== null) {
          this.$store.dispatch('setSiteLoad', this.tsData);
        }
        this.$store.dispatch('setIncludePOIConstraints', this.includeInterconnectionConstraints);
        this.$store.dispatch('setMaxImportFromGrid', this.maxImport);
        this.$store.dispatch('setMaxExportToGrid', this.maxExport);
      },
    },
  };
</script>
