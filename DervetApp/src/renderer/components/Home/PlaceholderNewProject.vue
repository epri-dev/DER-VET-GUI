<!-- Placeholder with create project functionality -->
<template>
  <div>
    <div>{{ `Project ID: ${projectId}` }}</div>
    <div>{{ `Project Name: ${projectName}` }}</div>
    <input v-model="inputName" placeholder="Enter project name">
    <button @click="setRandomUuid()">Generate UUID</button>
    <button @click="setProjectName(inputName)">Set project name</button>
    <router-link to="/wizard">
      Create Project
    </router-link>
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
    },
    data: {
      inputName: '',
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
    },
  };
</script>
