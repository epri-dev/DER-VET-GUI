<template>
  <div class="container body-content">
    <h3>Create a New Project</h3>
    <hr />
    <div class="form-horizontal form-buffer">
      <div class="form-group">
        <div class="col-md-3 text-right">
          <label class="control-label" for="ProjectName">Project Name</label>
        </div>
        <div class="col-md-4">
          <input v-model="inputName" type="text" class="form-control" id="ProjectName">
        </div>
        <div class="col-md-5">
          <p type="tool-tip">Name of the project.</p>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-3 text-right">
          <label class="control-label" for="ProjectType">Project Type</label>
        </div>
        <div class="col-md-4"> 
          <select class="custom-select" @click="setProjectType(inputType)" v-model="inputType" id="ProjectType">
            <option value="Expert">Expert</option>
            <option value="Wizard">Wizard</option>
          </select>        
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Wizard projects guide you through constructing an analysis by asking a series of questions. Expert Mode projects allow you to directly edit the project configuration data used by DER-VET. Please note that this decision is final &mdash; once you select a Project Type you cannot change it.</p>
        </div>
      </div>
      <hr />
      <div class="form-group form-buffer">
        <div class="col-md-12">
          <button @click="setProjectName(inputName)" type="submit" class="btn btn-primary pull-right">Save and Continue</button>
        </div>
      </div>
      <!-- <div>{{ `Project ID: ${projectId}` }}</div>
      <div>{{ `Project Name: ${projectName}` }}</div>
      <div>{{ `Project type: ${projectType}` }}</div> -->
    </div>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';

  export default {
    computed: {
      projectId() {
        return this.$store.state.Project.id;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
      projectType() {
        return this.$store.state.Project.type;
      },
    },
    data: {
      inputName: '',
      inputType: '',
      projectType: '',
    },
    methods: {
      setProjectName(inputName) {
        this.$store.dispatch('setName', inputName);
        this.inputName = '';
      },
      setRandomUuid() {
        this.$store.dispatch('setId', uuidv4());
      },
      resetProjectToDefault() {
        this.$store.dispatch('resetProjectToDefault');
      },
      setProjectType(type) {
        this.$store.dispatch('setType', type);
      },
    },
  };
</script>