<template>
  <div class="container body-content">

    <h3>Project Configuration</h3>
    <div class="form-horizontal form-buffer">

      <text-input
        v-model="name"
        v-bind:field="metadata.name"
        :isInvalid="submitted && $v.name.$error"
        :errorMessage="getErrorMsg('name')">
      </text-input>

      <text-input
        v-model="startYear"
        v-bind:field="metadata.startYear"
        :isInvalid="submitted && $v.startYear.$error"
        :errorMessage="getErrorMsg('startYear')">
      </text-input>

      <fieldset class="section-group">
        <legend>Analysis Window</legend>

        <radio-button-input
          v-model="analysisHorizonMode"
          v-bind:field="metadata.analysisHorizonMode"
          :isInvalid="submitted && $v.analysisHorizonMode.$error"
          :errorMessage="getErrorMsg('analysisHorizonMode')">
        </radio-button-input>

        <div class="row form-group" v-if="analysisHorizonMode === '1'">
          <text-input
            v-model="analysisHorizon"
            v-bind:field="metadata.analysisHorizon"
            :isInvalid="submitted && $v.analysisHorizon.$error"
            :errorMessage="getErrorMsg('analysisHorizon')">
          </text-input>
        </div>
      </fieldset>

      <fieldset class="section-group">
        <legend>Time Series Data</legend>
          <text-input
            v-model="dataYear"
            v-bind:field="metadata.dataYear"
            :isInvalid="submitted && $v.dataYear.$error"
            :errorMessage="getErrorMsg('dataYear')">
          </text-input>

          <drop-down-input
            v-model="timestep"
            v-bind:field="metadata.timestep"
            :isInvalid="submitted && $v.timestep.$error"
            :errorMessage="getErrorMsg('timestep')">
          </drop-down-input>
      </fieldset>

      <radio-button-input
        v-model="gridLocation"
        v-bind:field="metadata.gridLocation"
        :isInvalid="submitted && $v.gridLocation.$error"
        :errorMessage="getErrorMsg('gridLocation')">
      </radio-button-input>

      <radio-button-input
        v-model="ownership"
        v-bind:field="metadata.ownership"
        :isInvalid="submitted && $v.ownership.$error"
        :errorMessage="getErrorMsg('ownership')">
      </radio-button-input>

      <fieldset class="section-group">
        <legend>Run Configuration</legend>

        <!-- TODO make a file picker component -->
        <div class="row form-group">
          <div class="col-md-5 control-label">
            <b>Inputs Folder</b>
            <div>{{this.inputsDirectory}}</div>
          </div>
          <div class="col-md-3">
            <label for="inputsFilePicker" class="btn btn-secondary btn-md">Select folder</label>
            <input id="inputsFilePicker" style="visibility:hidden;" type="file" @change="onInputsDirectorySelection" webkitdirectory directory>
          </div>
          <div class="col-md-4">
            <p class="tool-tip">Folder where input files will be saved</p>
          </div>
        </div>

        <div class="row form-group">
          <div class="col-md-5 control-label">
            <b>Results Folder</b>
            <div>{{this.resultsDirectory}}</div>
          </div>
          <div class="col-md-3">
            <label for="resultsFilePicker" class="btn btn-secondary btn-md">Select folder</label>
            <input id="resultsFilePicker" style="visibility:hidden;" type="file" @change="onResultsDirectorySelection" webkitdirectory directory>
          </div>
          <div class="col-md-4">
            <p class="tool-tip">Folder where results files will be saved</p>
          </div>
        </div>
      </fieldset>

      <hr/>

      <save-buttons
        :continue-link="this.paths.OBJECTIVES_PATH"
        :displayError="submitted && $v.$anyError"
        :save="validatedSave"
      />
    </div>
  </div>
</template>

<script>

  import { requiredIf } from 'vuelidate/lib/validators';

  import * as p from '@/models/Project/Project';
  import * as c from '@/models/Project/constants';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import * as paths from '@/router/constants';
  import operateOnKeysList from '@/util/object';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.START_PROJECT_FIELDS);

  export default {
    mixins: [wizardFormMixin],
    data() {
      return {
        paths,
        ...this.getDataFromProject(),
        metadata,
      };
    },
    validations: {
      ...validations,
      analysisHorizon: {
        ...validations.analysisHorizon,
        required: requiredIf(function isAnalysisHorizonRequired() {
          return this.analysisHorizonMode === '1';
        }),
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
    computed: {
      complete() {
        return this.$store.state.Application.pageCompleteness.overview.start;
      },
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
        return operateOnKeysList(this.$store.state.Project, c.START_PROJECT_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: 'overview',
          page: 'start',
          completeness: !this.$v.$invalid,
        };
      },
      // TODO validate that directory is received using accepted answer here:
      // https://stackoverflow.com/questions/52667995/how-to-check-if-selected-file-is-a-directory-or-regular-file
      onInputsDirectorySelection(e) {
        this.inputsDirectory = e.target.files[0].path;
      },
      onResultsDirectorySelection(e) {
        this.resultsDirectory = e.target.files[0].path;
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.analysisHorizonMode !== '1') {
          this.resetNonRequired(['analysisHorizon']);
        }
        // set complete to true or false
        this.$store.dispatch('setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        return this.save();
      },
      save() {
        this.$store.dispatch('setName', this.name);
        this.$store.dispatch('setStartYear', this.startYear);
        this.$store.dispatch('setAnalysisHorizonMode', this.analysisHorizonMode);
        this.$store.dispatch('setAnalysisHorizon', this.analysisHorizon);
        this.$store.dispatch('setDataYear', this.dataYear);
        this.$store.dispatch('setGridLocation', this.gridLocation);
        this.$store.dispatch('setOwnership', this.ownership);
        this.$store.dispatch('setTimestep', this.timestep);
        this.$store.dispatch('setInputsDirectory', this.inputsDirectory);
        this.$store.dispatch('setResultsDirectory', this.resultsDirectory);
      },
    },
  };
</script>
