<template>
  <div class="container body-content">
    <h3>Create a New Project</h3>
    <hr />
    <div class="form-horizontal form-buffer">
      <div class="form-group">
        <div class="col-md-12 text-right">
          <label class="control-label" for="ProjectName">Project Name</label>
        </div>
        <div class="col-md-12">
          <input v-model="inputName" type="text" class="form-control" id="ProjectName">
        </div>
        <div class="col-md-12">
          <p type="tool-tip">Name of the project.</p>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-12 text-right">
          <label class="control-label" for="ProjectType">Project Type</label>
        </div>
        <div class="col-md-12"> 
          <select class="custom-select" @click="setProjectType(inputType)" v-model="inputType" id="ProjectType">
            <option value="Expert">Expert</option>
            <option value="Wizard">Wizard</option>
          </select>        
        </div>
        <div class="col-md-12">
          <p class="tool-tip">Wizard projects guide you through constructing an analysis by asking a series of questions. Expert Mode projects allow you to directly edit the project configuration data used by DER-VET. Please note that this decision is final &mdash; once you select a Project Type you cannot change it.</p>
        </div>
      </div>
      <hr />
      <div class="form-group form-buffer">
        <div class="col-md-12">
          <router-link v-on:click.native="saveAndContinue()" to="/wizard/start-project" class="btn btn-primary pull-right">
            Save and Continue
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';

  export default {
    data() {
      return {
        inputName: '',
        inputType: '',
      };
    },
    methods: {
      setRandomUuid() {
        this.$store.dispatch('setId', uuidv4());
      },
      setProjectName() {
        this.$store.dispatch('setName', this.inputName);
      },
      setProjectType() {
        this.$store.dispatch('setType', this.inputType);
      },
      saveAndContinue() {
        this.setRandomUuid();
        this.setProjectName();
        this.setProjectType();
      },
    },
  };
</script>
