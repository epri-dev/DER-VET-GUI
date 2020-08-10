<template>
  <div>
    <div class="container body-content">
      <h2>Project Imported!</h2>
      <hr />
      <div class="form-horizontal form-buffer">
          <p>The project <b>{{projectName}}</b> has been successfully imported. This results for this project were also imported.</p>
      </div>
    </div>
    <div v-if="projectResultsExist" class="form-horizontal form-bufferr">
        <p>This results for this project were also imported.</p>
    </div>
    <div class="row buffer-bottom">
      <div class="col-md-6 text-center">
        <router-link v-if="projectType === 'Wizard'" v-on:click.native="resetProjectToDefault()" to="/wizard/start-project" class="btn btn-lg btn-warning text-white">
          Open Imported Project
        </router-link>
        <router-link v-if="projectType === 'Expert'" v-on:click.native="resetProjectToDefault()" to="/Expert/start-project" class="btn btn-lg btn-warning text-white">
          Open Imported Project
        </router-link>
      </div>
      <div v-if="projectResultsExist" class="col-md-6 text-center">
        <router-link to="" class="btn btn-lg btn-info">View Project Results</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      projectName() {
        return this.$store.state.Project.name;
      },
      projectType() {
        return this.$store.state.Project.type;
      },
      projectResultsExist() {
        return Boolean(this.$store.state.Project.resultsData);
      },
    },
  };
</script>