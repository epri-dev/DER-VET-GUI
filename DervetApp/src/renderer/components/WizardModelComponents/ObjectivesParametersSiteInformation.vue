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
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import { projectMetadata } from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import '@/assets/samples/Sample_SiteLoad_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_SiteLoad_TimeSeries_8784.csv';

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
    computed: {
      isRequiredTSFields() {
        // return an object of booleans for every TS_FIELD,
        //   indicating if each is required
        const isRequiredObject = {};
        (TS_FIELDS).forEach((tsField) => {
          if (this.includeSiteLoad !== true && tsField === 'tsSiteLoad') {
            isRequiredObject[tsField] = false;
          } else {
            isRequiredObject[tsField] = true;
          }
        });
        return isRequiredObject;
      },
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.includeInterconnectionConstraints !== true) {
          this.resetNonRequired(['maxExport', 'maxImport']);
        }
        csvUploadMixin.methods.validatedSave.bind(this)();
      },
    },
  };
</script>
