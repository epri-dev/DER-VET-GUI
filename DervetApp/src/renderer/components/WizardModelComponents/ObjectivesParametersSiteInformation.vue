<template>
  <div>
    <h3>Services: Site Information</h3>
    <hr>
    <div class="form-horizontal form-buffer">
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

      <timeseries-data-upload
        chart-name="tsSiteLoadChartUploaded"
        @click="receiveRemove"
        :data-exists="tsData('tsSiteLoad').data.length !== 0"
        :DataModel="metadata.tsSiteLoad.DataModel"
        :data-name="metadata.tsSiteLoad.displayName"
        :data-time-series="tsData('tsSiteLoad')"
        :errorMessage="getErrorMsgTS('tsSiteLoad')"
        :isInvalid="submitted && tsData('tsSiteLoad').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsSiteLoad')"
        object-name="tsSiteLoad"
        @uploaded="receiveTimeseriesData"
        v-if="includeSiteLoad === true"
      />

        <div v-if="isTSError">
          <hr>
          <div class="form-group row">
            <div class="col-md-12">
              <i><a href="files/SampleSiteLoad-8760.csv"
                  download class="important-link text-decoration-none">
                  Download a sample <b>{{this.metadata.tsSiteLoad.displayName}}</b><code>.csv</code> file</a> with a 60-minute timestep for a year with 365 days (8,760 entries)</i>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-12">
              <i><a href="files/SampleSiteLoad-8784.csv" download class="important-link text-decoration-none">Download a sample <b>{{this.metadata.tsSiteLoad.displayName}}</b><code>.csv</code> file</a> with a 60-minute timestep <b>for a leap year with 366 days</b> (8,784 entries)
              </i>
            </div>
          </div>
        </div>

      </div>
      <hr>

      <save-and-save-continue
        :displayError="submitted && ($v.$anyError || isTSError)"
        :save="validatedSaveStay"
        :save-continue="validatedSaveContinue"
      />

    </div>
  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import '@/assets/samples/SampleSiteLoad-8760.csv';
  import '@/assets/samples/SampleSiteLoad-8784.csv';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import { projectMetadata } from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'siteInformation';
  const FIELDS = c.SITE_INFORMATION_FIELDS;
  const TS_FIELDS = [...c.TS_SITE_FIELDS];

  const ALL_FIELDS = [...FIELDS, ...TS_FIELDS];
  const validations = projectMetadata.getValidationSchema(FIELDS);

  const CONSTANTS = {
    DESTINATION_PATH,
    PAGEGROUP,
    PAGEKEY,
    PAGE,
    FIELDS,
    TS_FIELDS,
  };

  export default {
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      return {
        metadata: this.getMetadata(projectMetadata, ALL_FIELDS),
        includeSiteLoad: this.$store.state.Project.includeSiteLoad,
        ...this.getDataFromProject(ALL_FIELDS),
        ...this.getTSInputDefaultDataFromProject(TS_FIELDS),
        ...this.getChildKeys(TS_FIELDS),
        ...this.getUseExistingDefaults(TS_FIELDS),
        CONSTANTS,
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
    methods: {
      getErrorListTS() {
        const errors = [];
        (TS_FIELDS).forEach((tsField) => {
          // skip non-required tsFields
          if (this.includeSiteLoad !== true
            && tsField === 'tsSiteLoad') {
            return;
          }
          const errorMsgTS = this.getErrorMsgTSFromProject(tsField);
          if (errorMsgTS.length !== 0) {
            errors.push(errorMsgTS);
          }
        });
        return errors;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
    },
  };
</script>
