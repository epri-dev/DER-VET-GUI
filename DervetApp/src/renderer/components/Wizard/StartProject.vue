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
          <b>Start year</b>
        </div>
        <div class="col-md-4">
          <input v-model.number="inputStartYear" class="form-control numberbox" id="startYear" type="number" min="1980" step="1">
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
            <!-- <p class="tool-tip">Currently: {{projAnalysisHorizonMode}}</p> -->
          </div>
        </div>
        <div class="row form-group" v-if="inputHorizonMode === '1'">
          <div class="col-md-3 control-label">
            <b>Analysis Horizon</b>
          </div>
          <div class="col-md-4">
            <input v-model.number="inputAnalysisHorizon" class="form-control numberbox" id="AnalysisHorizon">
            <span class="unit-label">years</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip">The number of years the analysis will go for. The analysis will not consider equipment lifetime or anything else when determining the number of years to run for.</p>
            <!-- <p class="tool-tip">Currently: {{projectAnalysisHorizon}}</p> -->
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-3 control-label">
            <b>Data Year</b>
          </div>
          <div class="col-md-4">
            <input v-model.number="inputDataYear" class="form-control numberbox" id="dataYear" type="number" min="1980" step="1">
          </div>
          <div class="col-md-5">
            <p class="tool-tip">DER-VET uses exactly one year of data. If the year this data comes from is different from the year the optimization is run against, it will be escalated from the data year to the optimization year.</p>
            <!-- <p class="tool-tip">Currently: {{projDataYear}}</p> -->
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
          <!-- <p class="tool-tip">Currently: {{projGridLocation}}</p> -->
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
          <!-- <p class="tool-tip">Currently: {{projOwnership}}</p> -->
        </div>
      </div>
      <hr />
      <nav-buttons
        back-link="/new-project"
        continue-link="/wizard/technology-specs"
        :save="saveAndContinue"
      />
    </div>
  </div>
</template>

<script>
  import model from '../../models/StartProject';
  import NavButtons from './NavButtons';

  const { validation } = model;

  export default {
    components: { NavButtons },
    computed: {
      projectAnalysisHorizon() {
        return this.$store.state.Project.analysisHorizon;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
      projStartYear() {
        return this.$store.state.Project.startYear;
      },
      projAnalysisHorizonMode() {
        return this.$store.state.Project.analysisHorizonMode;
      },
      projDataYear() {
        return this.$store.state.Project.dataYear;
      },
      projGridLocation() {
        return this.$store.state.Project.gridLocation;
      },
      projOwnership() {
        return this.$store.state.Project.ownership;
      },
    },
    data() {
      const data = { validation };
      return { ...data, ...this.getDataFromProject() };
    },
    methods: {
      getDataFromProject() {
        const projectSpecs = this.$store.state.Project;
        return {
          inputStartYear: projectSpecs.startYear,
          inputOwnership: projectSpecs.ownership,
          inputLocation: projectSpecs.gridLocation,
          inputHorizonMode: projectSpecs.analysisHorizonMode,
          inputAnalysisHorizon: projectSpecs.analysisHorizon,
          inputDataYear: projectSpecs.dataYear,
        };
      },
      saveAndContinue() {
        this.$store.dispatch('setStartYear', this.inputStartYear);
        this.$store.dispatch('setAnalysisHorizonMode', this.inputHorizonMode);
        this.$store.dispatch('setAnalysisHorizon', this.inputAnalysisHorizon);
        this.$store.dispatch('setDataYear', this.inputDataYear);
        this.$store.dispatch('setGridLocation', this.inputLocation);
        this.$store.dispatch('setOwnership', this.inputOwnership);
      },
    },
  };
</script>