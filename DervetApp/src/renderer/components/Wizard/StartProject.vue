<!-- This is a placeholder -->
<template>
  <div class="container body-content">
    <h3>Project Configuration</h3>
    <!-- <div>{{ `Project ID: ${projectId}` }}</div>
    <div>{{ `Project Name: ${projectName}` }}</div> -->
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
        <div class="col-md-3 control-label">
          <b>Project Name</b>
        </div>
        <div class="col-md-4 form-control-static">
          <p>{{ projectName }}</p>
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
          <p class="help-block">Year the project starts. Currently: {{projStartYear}}</p>
        </div>
      </div>
      <fieldset class="section-group">
        <legend>Analysis Window</legend>
        <div class="row form-group">
          <div class="col-md-3 control-label">
            <b>Analysis Horizon Mode</b>
          </div>
          <div class="col-md-4 form-control-static">
            <b-form-group>
              <b-form-radio v-model="horizonMode" value="1">User-defined analysis horizon</b-form-radio>
              <b-form-radio v-model="horizonMode" value="2">Auto-calculate analysis horizon by shortest DER lifetime</b-form-radio>
              <b-form-radio v-model="horizonMode" value="3">Auto-calculate analysis horizon by longest DER lifetime</b-form-radio>
              <b-form-radio v-model="horizonMode" value="4">Use carrying cost</b-form-radio>
            </b-form-group>
          </div>
          <div class="col-md-5">
            <p class="tool-tip">Defines when/how to end CBA analysis</p>
          </div>
        </div>
        <div class="row form-group">  <!--add conditional to show iff horizonMode === '1' -->
          <div class="col-md-3 control-label">
            <b>Analysis Horizon</b>
          </div>
          <div class="col-md-4">
            <input v-model="analysisHorizon" class="form-control numberbox" id="AnalysisHorizon">
            <span class="unit-label">years</span>
          </div>
          <div class="col-md-5">
            <p class="tool-tip">The number of years the analysis will go for. The analysis will not consider equipment lifetime or anything else when determining the number of years to run for.</p>
          </div>
        </div>
      </fieldset>
      <div class="row form-group">
        <div class="col-md-3 control-label">
          <b>Grid Domain</b>
        </div>
        <div class="col-md-4 form-control-static">
          <b-form-radio-group v-model="location">
            <b-form-radio value="Customer">Customer</b-form-radio>
            <b-form-radio value="Distribution">Distribution</b-form-radio>
            <b-form-radio value="Transmission">Transmission</b-form-radio>
            <b-form-radio value="Generation">Generation</b-form-radio>
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
          <b-form-radio-group v-model="ownership">
            <b-form-radio value="Customer">Customer</b-form-radio>
            <b-form-radio value="Utility">Utility</b-form-radio>
            <b-form-radio value="3rd Party">3rd Party</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Who owns the assets.</p>
        </div>
      </div>
      <hr />
      <div class="form-group form-buffer">
        <div class="col-md-12">
          <button @click="setStartYear(inputStartYear)"type="submit" class="btn btn-primary pull-right">Save and Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      projectId() {
        return this.$store.state.Project.id;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
      projStartYear() {
        return this.$store.state.Project.startYear;
      },
    },
    data: {
      inputStartYear: 2020,
    },
    methods: {
      setStartYear(inputName) {
        this.$store.dispatch('setStartYear', inputName);
        this.inputStartYear = inputName;
      },
    },
  };
</script>