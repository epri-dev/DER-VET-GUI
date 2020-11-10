<template>
  <div class="container-fluid">
    <div class="row">
      <h3>Run Analysis</h3>
      <div class="col-md-12 text-center" v-if="!(resultsExist)">
        <img src="../../assets/copper-loader.gif" />
        <br />
        <label>Running Analysis for {{projectName}} </label>
        <br />
        <p>
          Please be patient... this can take several minutes to complete...
        </p>
      </div>
      <div class="col-md-12" v-if="resultsExist">
        <div>{{ `Pro forma: ${results.proForma.data}` }}</div>
        <br />
        <div>{{ `Cost benefit: ${results.costBenefit.data}` }}</div>
        <br />
        <div>{{ `Size: ${results.size.data}` }}</div>
        <hr />
        <router-link to="/results" class="btn btn-lg btn-info">
          Review Results
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'runAnalysis',
    computed: {
      resultsExist() {
        return this.$store.state.ProjectResult.data !== null;
      },
      results() {
        return this.$store.state.ProjectResult.data;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
    },
  };
</script>
