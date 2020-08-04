<!-- This is a placeholder -->
<template>
  <div class="container">
    <h3>Project Configuration</h3>
    <div>{{ `Project ID: ${projectId}` }}</div>
    <div>{{ `Project Name: ${projectName}` }}</div>
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
    },
  };
</script>
