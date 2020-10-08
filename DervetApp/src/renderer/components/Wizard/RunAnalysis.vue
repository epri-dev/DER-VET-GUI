<template>
  <div class="container-fluid">
    <div class="row">
      <h3>Run Analysis</h3>
      <div v-if="resultsExist">
        <div>{{ `Pro forma: ${results.proForma}` }}</div>
        <div>{{ `Cost benefit: ${results.costBenefit}` }}</div>
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
    },
  };
</script>
