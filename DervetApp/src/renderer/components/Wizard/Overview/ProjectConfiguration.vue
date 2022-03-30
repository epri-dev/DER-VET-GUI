<template>
  <div class="container body-content">

    <h3>Project Configuration</h3>
    <hr />

    <div class="form-horizontal form-buffer">

      <text-input
        v-model="name"
        :metadata="metadata.name"
        :isInvalid="submitted && $v.name.$error"
        :errorMessage="getErrorMsg('name')">
      </text-input>

      <text-input
        v-model="startYear"
        :metadata="metadata.startYear"
        :isInvalid="submitted && $v.startYear.$error"
        :errorMessage="getErrorMsg('startYear')">
      </text-input>

      <fieldset class="section-group">
        <legend>Analysis Window</legend>

        <radio-button-input
          v-model="analysisHorizonMode"
          :metadata="metadata.analysisHorizonMode"
          :isInvalid="submitted && $v.analysisHorizonMode.$error"
          :errorMessage="getErrorMsg('analysisHorizonMode')">
        </radio-button-input>

        <div v-if="analysisHorizonMode === '1'">
          <text-input
            v-model="analysisHorizon"
            :metadata="metadata.analysisHorizon"
            :isInvalid="submitted && $v.analysisHorizon.$error"
            :errorMessage="getErrorMsg('analysisHorizon')">
          </text-input>
        </div>
      </fieldset>

      <fieldset class="section-group">
        <legend>Time Series Data</legend>
          <text-input
            v-model="dataYear"
            :metadata="metadata.dataYear"
            :isInvalid="submitted && $v.dataYear.$error"
            :errorMessage="getErrorMsg('dataYear')">
          </text-input>

          <drop-down-input
            v-model="timestep"
            :metadata="metadata.timestep"
            :isInvalid="submitted && $v.timestep.$error"
            :errorMessage="getErrorMsg('timestep')">
          </drop-down-input>
      </fieldset>

      <radio-button-input
        v-model="gridLocation"
        :metadata="metadata.gridLocation"
        :isInvalid="submitted && $v.gridLocation.$error"
        :errorMessage="getErrorMsg('gridLocation')">
      </radio-button-input>

      <radio-button-input
        v-model="ownership"
        :metadata="metadata.ownership"
        :isInvalid="submitted && $v.ownership.$error"
        :errorMessage="getErrorMsg('ownership')">
      </radio-button-input>

      <fieldset class="section-group">
        <legend>Run Configuration</legend>
        <div class="row form-group">
          <div class="col-md-5 control-label">
            <b>Output Folder</b>
            <div>{{this.outputDirectory}}</div>
          </div>
          <file-picker
            label="Select folder"
            :callback="onOutputDirectorySelection"
            :isAsync="false"
            :isDirectory="true"
            buttonAttributes="btn btn-secondary btn-md"
            wrapperDivAttributes="col-md-3"
          />
          <div class="col-md-4">
            <p class="tool-tip">Folder where output files will be saved (optional).</p>
          </div>
        </div>
      </fieldset>

      <hr/>

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

  import FilePicker from '@/components/Shared/FilePicker';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import { CollectionType } from '@/models/Project/CollectionType';
  import { OBJECTIVES } from '@/router/constants';

  export default {
    mixins: [wizardFormMixin],
    components: {
      FilePicker,
    },
    data() {
      return this.getData(CollectionType.Project, Page.ProjectConfiguration, OBJECTIVES);
    },
    validations() {
      const { validationSchema } = this;
      return {
        ...validationSchema,
        analysisHorizon: {
          ...validationSchema.analysisHorizon,
          required: requiredIf(function isAnalysisHorizonRequired() {
            return this.analysisHorizonMode === '1';
          }),
        },
      };
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(this.validationSchema, this.$v, fieldName);
      },
      onOutputDirectorySelection(path) {
        this.outputDirectory = path;
      },
      resetAllNonRequired() {
        if (this.analysisHorizonMode !== '1') {
          this.resetNonRequired(['analysisHorizon']);
        }
      },
      validatedSave() {
        this.resetAllNonRequired();
        wizardFormMixin.methods.validatedSave.bind(this)();
      },
    },
  };
</script>
