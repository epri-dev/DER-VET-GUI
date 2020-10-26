<template>
  <div class="container body-content">

    <h3>Project Configuration</h3>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
        <div class="col-md-3 control-label">
          <b>Project Name</b>
        </div>
        <div class="col-md-4 form-control-static">
          <p>{{projectName}}</p>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Name of the project.</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-3 control-label">
          <b>Start Year</b>
        </div>
        <div class="col-md-4">
          <input
            v-model.number="inputStartYear.value"
            class="form-control numberbox"
            id="startYear"
            type="number"
            min="1980"
            step="1">
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Year the project starts.</p>
        </div>
      </div>
      <fieldset class="section-group">
        <legend>Analysis Window</legend>
        <div class="row form-group">
          <div class="col-md-3 control-label">
            <b>Analysis Horizon Mode</b>
          </div>
          <div class="col-md-4 form-control-static">
            <b-form-radio-group id="analysisHorizonMode" v-model="inputHorizonMode" >
              <b-form-radio v-for="value in validation.analysisHorizonMode.allowedValues" v-bind:value="value.value" v-bind:key="value.value">
                {{value['description']}}
              </b-form-radio>
            </b-form-radio-group>
          </div>
          <div class="col-md-5">
            <p class="tool-tip">Defines when/how to end CBA analysis</p>
          </div>
        </div>
        <div class="row form-group" v-if="inputHorizonMode === '1'">
          <div class="col-md-3 control-label">
            <b>Analysis Horizon</b>
          </div>
          <div class="col-md-4">
            <input
              v-model.number="inputAnalysisHorizon"
              type="number"
              class="form-control numberbox"
              id="AnalysisHorizon">
            <span class="unit-label">years</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip">The number of years the analysis will go for. The analysis will not consider equipment lifetime or anything else when determining the number of years to run for.</p>
          </div>
        </div>
      </fieldset>
      <fieldset class="section-group">
        <legend>Time Series Data</legend>
        <div class="row form-group">
          <div class="col-md-3 control-label">
            <b>Data Year</b>
          </div>
          <div class="col-md-4">
            <input v-model.number="inputDataYear" class="form-control numberbox" id="dataYear" type="number" min="1980" step="1">
          </div>
          <div class="col-md-5">
            <p class="tool-tip">Wizard mode only allows one year of data. If the year this data comes from is different from the year the optimization is run against, it will be escalated from the data year to the optimization year.</p>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label">Timestep</label>
          </div>
          <div class="col-md-4">
            <select
              class="form-control numberbox"
              id="timestep"
              v-model="inputTimestep">
              <option
                v-for="value in validation.timestep.allowedValues"
                v-bind:value="value">
                {{value}}
              </option>
            </select>
            <span class="unit-label">minutes</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip tooltip-col tt-col-0">What is the timestep that the optimization will use?</p>
          </div>
        </div>
      </fieldset>
      <div class="row form-group">
        <div class="col-md-3 control-label">
          <b>Grid Domain</b>
        </div>
        <div class="col-md-4 form-control-static">
          <b-form-radio-group v-model="inputLocation">
            <b-form-radio v-for="value in validation.gridLocation.allowedValues" v-bind:value="value" v-bind:key="value">
                {{value}}
              </b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Which grid domain the project will be connected to. This limits which services are available.</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-3 control-label">
          <b>Ownership</b>
        </div>
        <div class="col-md-4 form-control-static">
          <b-form-radio-group v-model="inputOwnership">
            <b-form-radio v-for="value in validation.ownership.allowedValues" v-bind:value="value" v-bind:key="value">
                {{value}}
              </b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Who owns the assets.</p>
        </div>
      </div>

      <fieldset class="section-group">
        <legend>Run Configuration</legend>

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

      <div v-if="showErrors">
        Please correct the following errors:
        <div v-for="error in errorsAtLastSubmit">{{error}}</div>
        <hr/>
      </div>

      <nav-buttons
        back-link="/new-project"
        continue-link="/wizard/technology-specs"
        :save="wrappedSave"
        :disabled="!isValid"
      />
    </div>
  </div>
</template>

<script>
  import { cloneDeep } from 'lodash';

  import model from '@/models/StartProject';
  import NavButtons from '@/components/Shared/NavButtons';
  import { StartYear } from '@/models/Project/Fields';

  const { validation } = model;

  export default {
    components: { NavButtons },
    computed: {
      errors() {
        const errors = [];
        errors.push(...this.inputStartYear.getValidationErrors());
        return errors;
      },
      isValid() {
        return this.errors.length === 0;
      },
      wrappedSave() {
        if (!this.isValid) {
          return () => {
            this.showErrors = !this.isValid;
            this.errorsAtLastSubmit = cloneDeep(this.errors);
          };
        }
        return this.saveAndContinue;
      },
      projectAnalysisHorizon() {
        return this.$store.state.Project.analysisHorizon;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
    },
    data() {
      const data = { validation };
      return {
        ...data,
        ...this.getDataFromProject(),
        showErrors: false,
        errorsAtLastSubmit: null,
      };
    },
    methods: {
      getDataFromProject() {
        const projectSpecs = this.$store.state.Project;
        return {
          inputTimestep: projectSpecs.timestep,
          inputStartYear: new StartYear(projectSpecs.startYear),
          inputOwnership: projectSpecs.ownership,
          inputLocation: projectSpecs.gridLocation,
          inputHorizonMode: projectSpecs.analysisHorizonMode,
          inputAnalysisHorizon: projectSpecs.analysisHorizon,
          inputDataYear: projectSpecs.dataYear,
          inputsDirectory: projectSpecs.inputsDirectory,
          resultsDirectory: projectSpecs.resultsDirectory,
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
      saveAndContinue() {
        this.$store.dispatch('setStartYear', this.inputStartYear.value);
        this.$store.dispatch('setAnalysisHorizonMode', this.inputHorizonMode);
        this.$store.dispatch('setAnalysisHorizon', this.inputAnalysisHorizon);
        this.$store.dispatch('setDataYear', this.inputDataYear);
        this.$store.dispatch('setGridLocation', this.inputLocation);
        this.$store.dispatch('setOwnership', this.inputOwnership);
        this.$store.dispatch('setTimestep', this.inputTimestep);
        this.$store.dispatch('setInputsDirectory', this.inputsDirectory);
        this.$store.dispatch('setResultsDirectory', this.resultsDirectory);
      },
    },
  };
</script>