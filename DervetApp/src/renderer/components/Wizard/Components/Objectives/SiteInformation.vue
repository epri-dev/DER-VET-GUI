<template>
  <div>
    <h3>Services: Site Information</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <radio-button-input v-model="includeInterconnectionConstraints"
                          :metadata="metadata.includeInterconnectionConstraints"
                          :isInvalid="submitted && $v.includeInterconnectionConstraints.$error"
                          :errorMessage="getErrorMsg('includeInterconnectionConstraints')">
      </radio-button-input>

      <div class="form-group" v-if="includeInterconnectionConstraints">
        <text-input v-model="maxExport"
                    :metadata="metadata.maxExport"
                    :isInvalid="submitted && $v.maxExport.$error"
                    :errorMessage="getErrorMsg('maxExport')">
        </text-input>

        <text-input v-model="maxImport"
                    :metadata="metadata.maxImport"
                    :isInvalid="submitted && $v.maxImport.$error"
                    :errorMessage="getErrorMsg('maxImport')">
        </text-input>
      </div>

      <hr>

      <time-series-upload
        v-if="includeSiteLoad()"
        :chartKey="chartKey"
        :data="tsSiteLoad"
        :metadata="metadata.tsSiteLoad"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsSiteLoad"
        @data="setData"
      />

      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
      />
    </div>
  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionType.Project, Page.ObjectivesSiteInformation);
    },
    validations() {
      return {
        ...this.validationSchema,
        maxExport: {
          ...this.validationSchema.maxExport,
          required: requiredIf(function isMaxExportRequired() {
            return this.includeInterconnectionConstraints;
          }),
        },
        maxImport: {
          ...this.validationSchema.maxImport,
          required: requiredIf(function isMaxImportRequired() {
            return this.includeInterconnectionConstraints;
          }),
        },
      };
    },
    computed: {
      includeSiteLoad() {
        return this.$store.getters.includeSiteLoad;
      },
    },
    methods: {
      resetAllNonRequired() {
        if (this.includeInterconnectionConstraints !== true) {
          this.resetNonRequired(['maxExport', 'maxImport']);
        }
      },
      validatedSave() {
        this.resetAllNonRequired();
        wizardFormMixin.methods.validatedSave.bind(this)();
      },
    },
  };
</script>
