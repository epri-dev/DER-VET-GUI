<!-- This is a placeholder -->
<template>
  <div class="container body-content">
    <h3>Project Configuration</h3>
    <!-- <div>{{ `Project ID: ${projectId}` }}</div>
    <div>{{ `Project Name: ${projectName}` }}</div> -->
    <div class="form-horizontal form-buffer">
            <div class="form-group">
                <div class="col-md-3">
                    <b>Project Name</b>
                </div>
                <div class="col-md-4 form-control-static">
                    <p>{{ projectName }}</p>
                </div>
                <div class="col-md-5">
                    <p class="tool-tip">Name of the project.</p>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-3">
                    <b>Start year</b>
                </div>
                <div class="col-md-4">
                    <input v-model="inputStartYear" type="text" class="form-control" id="ProjectName">
                </div>
                <div class="col-md-5">
                    <p class="tool-tip">Year the project starts. Which is: {{projStartYear}}</p>
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