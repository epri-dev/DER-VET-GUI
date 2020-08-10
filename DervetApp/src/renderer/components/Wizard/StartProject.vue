<!-- This is a placeholder -->
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
        <div class="col-md-9">
          <input v-model="inputStartYear" class="form-control numberbox" id="startYear" type="number" min="1980" step="1">
          <p class="help-block">Year the project starts.</p>
          <!-- <p class="tool-tip">Currently: {{projStartYear}}</p> -->
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
              <b-form-radio value="1">User-defined analysis horizon</b-form-radio>
              <b-form-radio value="2">Auto-calculate analysis horizon by shortest DER lifetime</b-form-radio>
              <b-form-radio value="3">Auto-calculate analysis horizon by longest DER lifetime</b-form-radio>
              <b-form-radio value="4">Use carrying cost</b-form-radio>
            </b-form-radio-group>
          </div>
          <div class="col-md-5">
            <p class="tool-tip">Defines when/how to end CBA analysis</p>
            <!-- <p class="tool-tip">Currently: {{projectAnalysisHorizon}}</p> -->
          </div>
        </div>
        <div class="row form-group" v-if="inputHorizonMode === '1'">
          <div class="col-md-3 control-label">
            <b>Analysis Horizon</b>
          </div>
          <div class="col-md-4">
            <input v-model="inputAnalysisHorizon" class="form-control numberbox" id="AnalysisHorizon">
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
            <input v-model="inputDataYear" class="form-control numberbox" id="dataYear" type="number" min="1980" step="1">
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
            <b-form-radio value="Customer">Customer</b-form-radio>
            <b-form-radio value="Distribution">Distribution</b-form-radio>
            <b-form-radio value="Transmission">Transmission</b-form-radio>
            <b-form-radio value="Generation">Generation</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Which grid domain the project will be connected to. This limits which services are available.</p>
          <!-- // <p class="tool-tip">Currently: {{projGridLocation}}</p> -->
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-3 control-label">
          <b>Ownership</b>
        </div>
        <div class="col-md-4 form-control-static">
          <b-form-radio-group v-model="inputOwnership">
            <b-form-radio value="Customer">Customer</b-form-radio>
            <b-form-radio value="Utility">Utility</b-form-radio>
            <b-form-radio value="3rd Party">3rd Party</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Who owns the assets.</p>
          <!-- <p class="tool-tip">Currently: {{projOwnership}}</p> -->
        </div>
      </div>
      <hr />
      <div class="form-group form-buffer">
        <div class="col-md-12">
          <button @click="setStartYear(inputStartYear); setAnalysisHorizon(inputAnalysisHorizon); setDataYear(inputDataYear); setGridLocation(inputLocation); setOwnership(inputOwnership); setAnalysisHorizonMode(inputAnalysisHorizon)" type="submit" class="btn btn-primary pull-right">Save and Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
      return {
        inputStartYear: 2020,
        inputOwnership: 'Customer',
        inputLocation: 'Customer',
        inputHorizonMode: '1',
        inputAnalysisHorizon: 1,
        inputDataYear: 2020,
      };
    },
    methods: {
      setStartYear(inputtedStarYear) {
        this.$store.dispatch('setStartYear', inputtedStarYear);
        this.inputStartYear = inputtedStarYear;
      },
      setAnalysisHorizonMode(inputtedAnalysisHorizonMode) {
        this.$store.dispatch('setAnalysisHorizonMode', inputtedAnalysisHorizonMode);
        this.inputHorizonMode = inputtedAnalysisHorizonMode;
      },
      setAnalysisHorizon(inputtedAnalysisHorizon) {
        this.$store.dispatch('setAnalysisHorizon', inputtedAnalysisHorizon);
        this.inputAnalysisHorizon = inputtedAnalysisHorizon;
      },
      setDataYear(inputtedDataYear) {
        this.$store.dispatch('setDataYear', inputtedDataYear);
        this.inputDataYear = inputtedDataYear;
      },
      setGridLocation(inputtedGridLocation) {
        this.$store.dispatch('setGridLocation', inputtedGridLocation);
        this.inputLocation = inputtedGridLocation;
      },
      setOwnership(inputtedOwnership) {
        this.$store.dispatch('setOwnership', inputtedOwnership);
        this.inputOwnership = inputtedOwnership;
      },
    },
  };
</script>