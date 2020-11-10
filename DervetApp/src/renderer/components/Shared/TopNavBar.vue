<template>
  <div>
    <b-navbar fixed="top" type="dark" variant="dark">
      <b-navbar-brand>DER-VET</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <!-- TODO add v-if to show/hide buttons based on the state of the project -->
          <b-nav-item to="/wizard">Project</b-nav-item> 
          <b-nav-item to="/results" v-if="resultsExist">Results</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
  export default {
    computed: {
      resultsExist() {
        return this.$store.state.ProjectResult.data !== null;
      },
    },
  };
</script>
